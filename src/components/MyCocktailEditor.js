import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import g from "../styles/styles";
import { Button, Card } from "@rneui/base";
import { AuthContext } from "../providers/AuthProvider";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SelectDropdown from "react-native-select-dropdown";
import RadioButtonsGroup from "react-native-radio-buttons-group";

// NEED TO FIX
// connect the ingredient container to cocktail editor component state
// styling

const IngredientContainer = ({
  deleteIngredient,
  ingredientId,
  tempIngredients,
  setTempIngredients,
  ingredient,
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
    name: ingredient.name,
    amount: ingredient.amount,
    unit: ingredient.unit,
    type: "Core Ingredient",
  });
  const units = ["oz", "tsp", "tbs", "dash"];

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
      <TextInput
        style={{ ...styles.textInput, marginTop: 8 }}
        onFocus={() => console.log(ingredientInfo)}
        value={ingredientInfo.name}
        onChangeText={(name) => updateIngredientInfo("name", name)}
      />
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
          value={ingredientInfo.amount}
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
          defaultValue={ingredientInfo.unit}
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

const MyCocktailEditor = ({ route, navigation }) => {
  const cocktail = route.params;
  const [editingCocktailInfo, setEditingCocktailInfo] = useState({
    ...cocktail,
  });
  const [tempIngredients, setTempIngredients] = useState([]);
  const [nextIngredientId, setNextIngredientId] = useState(0);
  const [errors, setErrors] = useState({});
  const [recipeInputHeight, setRecipeInputHeight] = useState(40);
  const [modalVisible, setModalVisible] = useState(false);

  const { handleUpdateUserCocktail, handleDeleteUserCocktail } =
    useContext(AuthContext);

  useEffect(() => {
    let counter = 0;
    const indexedIngredients = cocktail.requiredIngredients.map(
      (ingredient) => {
        const ingredientWithId = { ...ingredient, _id: counter };
        counter++;
        return ingredientWithId;
      }
    );
    setNextIngredientId(counter);
    setTempIngredients(indexedIngredients);
  }, []);

  const updateEditingCocktailInfo = (value, name) => {
    setEditingCocktailInfo({ ...editingCocktailInfo, [name]: value });
  };

  const saveIngredients = () => {
    const trimmedIngredients = [];
    tempIngredients.forEach((ingredient) => {
      const trimmedIngredient = {
        name: ingredient.name,
        unit: ingredient.unit,
        amount: ingredient.amount,
      };
      trimmedIngredients.push(trimmedIngredient);
    });
    setNewCocktail({
      ...editingCocktailInfo,
      requiredIngredients: trimmedIngredients,
    });
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
      ingredient={ingredient}
      tempIngredients={tempIngredients}
      setTempIngredients={setTempIngredients}
    />
  ));

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!editingCocktailInfo.name) {
      setErrors({ name: "A cocktail name is required." });
      valid = false;
    }
    return valid;
  };

  const onUpdateUserCocktail = async () => {
    if (validate()) {
      try {
        await handleUpdateUserCocktail(cocktail._id, editingCocktailInfo);
        navigation.navigate("My Cocktails");
      } catch (err) {
        alert(err);
      }
    }
  };

  const onDeleteUserCocktail = async () => {
    try {
      await handleDeleteUserCocktail(cocktail);
      navigation.navigate("My Cocktails");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <ScrollView>
          <View style={styles.cardView}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{ position: "absolute", right: 40, top: 24, zIndex: 10 }}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                size={28}
                style={{
                  color: "#262626",
                }}
              />
            </Pressable>
            <Text style={{ fontSize: 24 }}>Name:</Text>
            <TextInput
              style={!errors.name ? styles.textInput : styles.textInputError}
              value={editingCocktailInfo.name}
              onChangeText={(name) => updateEditingCocktailInfo(name, "name")}
              onFocus={() => setErrors({ name: undefined })}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <Text style={{ fontSize: 20, marginTop: 16 }}>Ingredients:</Text>
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
            <Text style={{ fontSize: 20, marginTop: 16 }}>Recipe:</Text>
            <TextInput
              style={{ ...styles.textInput, height: recipeInputHeight }}
              multiline={true}
              value={editingCocktailInfo.recipe}
              onChangeText={(recipe) =>
                updateEditingCocktailInfo(recipe, "recipe")
              }
              onContentSizeChange={(e) => {
                setRecipeInputHeight(e.nativeEvent.contentSize.height + 12);
              }}
            />
            <Button
              containerStyle={{ marginTop: 16, borderRadius: 8 }}
              title="Save Changes"
              onPress={() => onUpdateUserCocktail()}
            />

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType={"fade"}
            >
              <View style={styles.modalView}>
                <Text
                  style={styles.modalText}
                >{`Are you sure you want to delete ${cocktail.name}?`}</Text>
                <View style={styles.modalButtonContainer}>
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                    containerStyle={styles.modalButton}
                  />
                  <Button
                    title="Delete"
                    onPress={() => onDeleteUserCocktail()}
                    containerStyle={styles.modalButton}
                  />
                </View>
              </View>
            </Modal>
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
  },
  textInputError: {
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    fontSize: 20,
    borderColor: "red",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  modalView: {
    margin: 32,
    padding: 48,
    backgroundColor: g.colors.primary,
    borderRadius: 16,
  },
  modalText: {
    //textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  modalButtonContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 32,
  },
  modalButton: {
    marginRight: 32,
    borderRadius: 8,
  },
});

export default MyCocktailEditor;
