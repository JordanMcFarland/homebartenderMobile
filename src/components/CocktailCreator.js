import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed/dist/Button";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base";
import { AuthContext } from "../providers/AuthProvider";
import g from "../styles/styles";
import SelectDropdown from "react-native-select-dropdown";
import RadioButtonsGroup from "react-native-radio-buttons-group";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CheckBox } from "@rneui/base";

const IngredientContainer = ({
  deleteIngredient,
  ingredientId,
  tempIngredients,
  setTempIngredients,
}) => {
  // STATE
  const radioButtonsData = [
    {
      id: "1",
      label: "Core Ingredient",
      value: "coreingredient",
      selected: true,
    },
    {
      id: "2",
      label: "Garnish",
      value: "garnish",
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [ingredientInfo, setIngredientInfo] = useState({
    name: "",
    amount: "",
    unit: "",
    type: "Core Ingredient",
    custom: false,
  });

  const { uncategorizedIngredients } = useContext(AirtableContext);
  const units = ["oz", "tsp", "tbs", "dash", "dashes"];

  // FUNCTIONS
  useEffect(() => {
    updateTempIngredients();
  }, [ingredientInfo]);

  const updateTempIngredients = () => {
    const index = tempIngredients.findIndex(
      (ingredient) => ingredient._id === ingredientId
    );
    const arr = [...tempIngredients];
    //const ingredientString = `${ingredientInfo.amount} ${ingredientInfo.unit} ${ingredientInfo.name}`;
    arr[index] = { ...arr[index], ...ingredientInfo };
    setTempIngredients(arr);
  };

  const updateIngredientInfo = (key, value) => {
    setIngredientInfo({ ...ingredientInfo, [key]: value });
  };

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    setIngredientInfo({
      ...ingredientInfo,
      type: radioButtonsArray[0].selected ? "Core Ingredient" : "Garnish",
    });
  };

  const confirmDeleteIngredient = () => {
    Alert.alert(
      "Delete this ingredient?",
      null,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deleteIngredient(ingredientId),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // RENDER
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: g.colors.background,
        backgroundColor: g.colors.secondary,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginTop: 16,
      }}
    >
      <Text>Ingredient Name:</Text>
      <View style={{ flexDirection: "row" }}>
        {ingredientInfo.custom ? (
          <TextInput
            style={{ ...styles.textInput, marginTop: 8, width: "60%" }}
            onFocus={() => console.log(ingredientInfo)}
            value={ingredientInfo.name}
            onChangeText={(name) => updateIngredientInfo("name", name)}
          />
        ) : (
          <SelectDropdown
            data={uncategorizedIngredients}
            search={true}
            defaultValue={ingredientInfo.name}
            onSelect={(name) => updateIngredientInfo("name", name)}
            searchPlaceHolder="Search ingredients..."
            buttonStyle={{
              marginTop: 8,
              borderRadius: 8,
              backgroundColor: g.colors.primary,
              height: 40,
            }}
            buttonTextStyle={{
              color: "#fff",
            }}
            dropdownStyle={{
              borderRadius: 8,
              backgroundColor: g.colors.background,
            }}
            rowTextStyle={{ color: "#fff" }}
          />
        )}
        <CheckBox
          containerStyle={{
            backgroundColor: g.colors.secondary,
            marginRight: 0,
          }}
          size={28}
          uncheckedColor={g.colors.background}
          checkedColor={g.colors.primary}
          onPress={() =>
            setIngredientInfo({
              ...ingredientInfo,
              custom: !ingredientInfo.custom,
            })
          }
          checked={ingredientInfo.custom}
          title="Custom"
          textStyle={{
            fontSize: 20,
            fontWeight: "normal",
          }}
        />
      </View>
      <Text>Amount:</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          keyboardType="number-pad"
          style={{
            ...styles.textInput,
            width: "25%",
            maxWidth: "50%",
            marginHorizontal: 8,
            marginTop: 8,
          }}
          onChangeText={(amount) => updateIngredientInfo("amount", amount)}
        />
        <SelectDropdown
          data={units}
          buttonStyle={{
            borderRadius: 8,
            backgroundColor: g.colors.primary,
            maxWidth: "50%",
            marginHorizontal: 8,
            marginTop: 8,
            height: 40,
          }}
          defaultButtonText="Select"
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          onSelect={(selectedItem) =>
            updateIngredientInfo("unit", selectedItem)
          }
        />
      </View>
      <Text>Type:</Text>
      <RadioButtonsGroup
        radioButtons={radioButtons}
        onPress={(radioButtonsArray) => {
          onPressRadioButton(radioButtonsArray);
          console.log();
        }}
        containerStyle={{ flexDirection: "row" }}
      />
      <Pressable
        style={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        onPress={() => confirmDeleteIngredient()}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          style={{ color: g.colors.primary }}
          size={24}
        />
      </Pressable>
    </View>
  );
};

const CocktailCreator = ({ navigation }) => {
  const [newCocktail, setNewCocktail] = useState({
    name: "",
    requiredIngredients: [],
    recipe: "",
    image: "",
  });
  const [tempIngredients, setTempIngredients] = useState([{ _id: 0 }]);
  const [nextIngredientId, setNextIngredientId] = useState(1);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeInputHeight, setRecipeInputHeight] = useState(40);

  const { handlePostUserCocktail } = useContext(AuthContext);

  useEffect(() => {
    saveIngredients();
  }, [tempIngredients]);

  const updateNewCocktail = (value, name) => {
    setNewCocktail({ ...newCocktail, [name]: value });
  };

  const saveIngredients = () => {
    const trimmedIngredients = [];
    tempIngredients.forEach((ingredient) => {
      const trimmedIngredient = {
        name: ingredient.name,
        unit: ingredient.unit,
        amount: ingredient.amount,
        custom: ingredient.custom,
        type: ingredient.type,
      };
      trimmedIngredients.push(trimmedIngredient);
    });
    setNewCocktail({
      ...newCocktail,
      requiredIngredients: trimmedIngredients,
    });
  };

  const onPostUserCocktail = async (newCocktail) => {
    if (validate()) {
      try {
        await handlePostUserCocktail(newCocktail);
        setTempIngredients([{ _id: 0 }]);
        setNewCocktail({
          name: "",
          requiredIngredients: [],
          recipe: "",
          image: "",
        });
        navigation.navigate("My Cocktails");
      } catch (err) {
        alert(err);
      }
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!newCocktail.name) {
      setErrors({ name: "A cocktail name is required." });
      valid = false;
    }
    return valid;
  };

  const addIngredient = () => {
    setTempIngredients([...tempIngredients, { _id: nextIngredientId }]);
    setNextIngredientId(nextIngredientId + 1);
  };

  const deleteIngredient = (_id) => {
    const newTempIngredientsArr = tempIngredients.filter(
      (ingredient) => ingredient._id !== _id
    );
    setTempIngredients(newTempIngredientsArr);
  };

  const renderIngredientContainers = tempIngredients.map((ingredient) => (
    <IngredientContainer
      key={ingredient._id}
      deleteIngredient={deleteIngredient}
      ingredientId={ingredient._id}
      tempIngredients={tempIngredients}
      setTempIngredients={setTempIngredients}
    />
  ));

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <ScrollView>
          <View style={styles.cardView}>
            <Text style={{ fontSize: 24 }}>Name: </Text>
            <TextInput
              style={
                errors.name
                  ? { ...styles.textInput, borderColor: "red", borderWidth: 2 }
                  : styles.textInput
              }
              value={newCocktail.name}
              onChangeText={(name) => updateNewCocktail(name, "name")}
              onFocus={() => setErrors({ name: undefined })}
            />
            {errors.name && (
              <Text style={{ color: "red", marginTop: 4 }}>{errors.name}</Text>
            )}
            <Text style={{ fontSize: 24, marginTop: 16 }}>Ingredients: </Text>
            {renderIngredientContainers}
            <Pressable
              style={{
                marginTop: 16,
                backgroundColor: g.colors.background,
                alignSelf: "flex-start",
                borderRadius: 16,
              }}
              onPress={() => addIngredient()}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: g.colors.primary }}
                size={24}
              />
            </Pressable>
            <Text style={{ fontSize: 24, marginTop: 16 }}>Recipe: </Text>
            <TextInput
              style={{ ...styles.textInput, height: recipeInputHeight }}
              value={newCocktail.recipe}
              multiline={true}
              onChangeText={(recipe) => updateNewCocktail(recipe, "recipe")}
              onContentSizeChange={(e) => {
                setRecipeInputHeight(e.nativeEvent.contentSize.height + 12);
              }}
            />
            <Button
              containerStyle={{
                ...styles.button,
                alignSelf: "center",
              }}
              title="Submit"
              onPress={() => {
                console.log(newCocktail);
                onPostUserCocktail(newCocktail);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.colors.background,
  },
  card: {
    backgroundColor: g.colors.secondary,
    borderRadius: 16,
    padding: 0,
    marginBottom: 16,
  },
  cardView: {
    paddingHorizontal: 40,
    paddingVertical: 24,
  },
  textInput: {
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    fontSize: 20,
    borderColor: g.colors.background,
    borderWidth: 1,
  },
  ingredientScrollView: {
    backgroundColor: "#FFCCCB",
    borderRadius: 8,
    padding: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});

export default CocktailCreator;
