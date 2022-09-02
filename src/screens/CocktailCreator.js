import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed/dist/Button";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base";
import { AuthContext } from "../providers/AuthProvider";
import g, { colors } from "../styles/styles";
import SelectDropdown from "react-native-select-dropdown";
import RadioButtonsGroup from "react-native-radio-buttons-group";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CheckBox } from "@rneui/base";
import { width } from "../styles/styles";

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
      style={[
        g.bdc.dark,
        g.bg.secondary,
        g.p2,
        g.br2,
        g.mt3,
        { borderWidth: 1 },
      ]}
    >
      <Text>Ingredient Name:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {ingredientInfo.custom ? (
          <TextInput
            style={[
              g.bg.white,
              g.mt3,
              g.br2,
              g.ph2,
              g.h4,
              g.bdc.dark,
              g.mt2,
              g.mh2,
              { height: 40, borderWidth: 1, width: width / 2 },
            ]}
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
              marginTop: g.mt2.marginTop,
              marginHorizontal: g.mh2.marginHorizontal,
              borderRadius: g.br2.borderRadius,
              backgroundColor: g.bg.primary.backgroundColor,
              height: 40,
              width: width / 2,
            }}
            buttonTextStyle={g.white}
            dropdownStyle={g.br2}
          />
        )}
        <CheckBox
          containerStyle={[
            g.bg.secondary,
            { paddingHorizontal: 0, marginBottom: 0, paddingBottom: 0 },
          ]}
          size={28}
          uncheckedColor={g.dark.color}
          checkedColor={g.primary.color}
          onPress={() =>
            setIngredientInfo({
              ...ingredientInfo,
              custom: !ingredientInfo.custom,
            })
          }
          checked={ingredientInfo.custom}
          title="Custom"
          textStyle={[g.h4, { fontWeight: "normal" }]}
        />
      </View>
      <Text style={g.mt2}>Amount:</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          keyboardType="number-pad"
          style={[
            g.bg.white,
            g.mt2,
            g.br2,
            g.ph2,
            g.h4,
            g.bdc.dark,
            g.mh2,
            { height: 40, borderWidth: 1, width: width / 4 },
          ]}
          onChangeText={(amount) => updateIngredientInfo("amount", amount)}
        />
        <SelectDropdown
          data={units}
          buttonStyle={{
            borderRadius: g.br2.borderRadius,
            backgroundColor: g.bg.primary.backgroundColor,
            marginHorizontal: g.mh2.marginHorizontal,
            marginTop: g.mt2.marginTop,
            width: width / 4,
            height: 40,
          }}
          dropdownStyle={g.br2}
          defaultButtonText="Select"
          buttonTextStyle={g.white}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          onSelect={(selectedItem) =>
            updateIngredientInfo("unit", selectedItem)
          }
        />
      </View>
      <Text style={g.mt2}>Type:</Text>
      <RadioButtonsGroup
        radioButtons={radioButtons}
        onPress={(radioButtonsArray) => {
          onPressRadioButton(radioButtonsArray);
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
        <FontAwesomeIcon icon={faTrashCan} style={g.primary} size={24} />
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
    <View style={[{ flex: 1 }, g.bg.dark]}>
      <Card containerStyle={[g.bg.secondary, g.br3, g.mb3, { padding: 0 }]}>
        <ScrollView>
          <View style={g.p4}>
            <Text style={{ fontSize: 24 }}>Name: </Text>
            <TextInput
              style={
                errors.name
                  ? [
                      g.bg.white,
                      g.mt3,
                      g.br2,
                      g.ph2,
                      g.h4,
                      g.bdc.dark,
                      g.bdc.error,
                      { height: 40, borderWidth: 2 },
                    ]
                  : [
                      g.bg.white,
                      g.mt3,
                      g.br2,
                      g.ph2,
                      g.h4,
                      g.bdc.dark,
                      { height: 40, borderWidth: 1 },
                    ]
              }
              value={newCocktail.name}
              onChangeText={(name) => updateNewCocktail(name, "name")}
              onFocus={() => setErrors({ name: undefined })}
            />
            {errors.name && <Text style={[g.error, g.mt1]}>{errors.name}</Text>}
            <Text style={[g.h3, g.mt3]}>Ingredients: </Text>
            {renderIngredientContainers}
            <Pressable
              style={[g.mt3, g.bg.dark, g.br3, { alignSelf: "flex-start" }]}
              onPress={() => addIngredient()}
            >
              <FontAwesomeIcon icon={faPlus} style={g.primary} size={24} />
            </Pressable>
            <Text style={[g.h3, g.mt3]}>Recipe: </Text>
            <TextInput
              style={[
                g.bg.white,
                g.mt3,
                g.br2,
                g.ph2,
                g.h4,
                g.bdc.dark,
                { height: 40, borderWidth: 1, height: recipeInputHeight },
              ]}
              value={newCocktail.recipe}
              multiline={true}
              onChangeText={(recipe) => updateNewCocktail(recipe, "recipe")}
              onContentSizeChange={(e) => {
                setRecipeInputHeight(e.nativeEvent.contentSize.height + 12);
              }}
            />
            <Button
              containerStyle={[g.mt3, g.br2, { alignSelf: "center" }]}
              title="Submit"
              onPress={() => {
                onPostUserCocktail(newCocktail);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

export default CocktailCreator;
