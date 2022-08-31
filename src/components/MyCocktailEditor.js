import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import g, { width } from "../styles/styles";
import { Button, Card } from "@rneui/base";
import { AuthContext } from "../providers/AuthProvider";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SelectDropdown from "react-native-select-dropdown";
import RadioButtonsGroup from "react-native-radio-buttons-group";
import { AirtableContext } from "../providers/AirtableProvider";
import { CheckBox } from "@rneui/base";

const IngredientContainer = ({
  deleteIngredient,
  tempIngredients,
  setTempIngredients,
  ingredient,
}) => {
  // STATE
  const [ingredientInfo, setIngredientInfo] = useState({
    name: ingredient.name ? ingredient.name : "",
    amount: ingredient.amount ? ingredient.amount : "",
    unit: ingredient.unit ? ingredient.unit : "",
    type: "Core Ingredient",
    custom: ingredient.custom,
  });
  const radioButtonsData = [
    {
      id: "1",
      label: "Core Ingredient",
      value: "coreingredient",
      selected: ingredient.type ? ingredient.type === "Core Ingredient" : true,
    },
    {
      id: "2",
      label: "Garnish",
      value: "garnish",
      selected: ingredient.type === "Garnish",
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const { uncategorizedIngredients } = useContext(AirtableContext);
  const units = ["   ", "oz", "tsp", "tbs", "dash", "dashes"];

  // FUNCTIONS
  useEffect(() => {
    updateTempIngredients();
  }, [ingredientInfo]);

  const updateTempIngredients = () => {
    const index = tempIngredients.findIndex(
      (ing) => ing._id === ingredient._id
    );
    const arr = [...tempIngredients];
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
          onPress: () => deleteIngredient(ingredient._id),
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {ingredientInfo.custom ? (
          <TextInput
            style={[
              g.bg.white,
              g.mt2,
              g.br2,
              g.ph2,
              g.h4,
              g.bdc.dark,
              g.mh2,
              { borderWidth: 1, height: 40, width: width / 2 },
            ]}
            value={ingredientInfo.name}
            onChangeText={(name) => updateIngredientInfo("name", name)}
          />
        ) : (
          <SelectDropdown
            data={uncategorizedIngredients}
            defaultButtonText="Select Ingredient"
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
            g.mh2,
            g.br2,
            g.ph2,
            g.h4,
            g.bdc.dark,
            { borderWidth: 1, height: 40, width: width / 4 },
          ]}
          value={ingredientInfo.amount}
          onChangeText={(amount) => updateIngredientInfo("amount", amount)}
        />
        <SelectDropdown
          data={units}
          buttonStyle={{
            borderRadius: g.br2.borderRadius,
            backgroundColor: g.bg.primary.backgroundColor,
            marginHorizontal: g.mh2.marginHorizontal,
            marginTop: g.mt2.marginTop,
            height: 40,
            width: width / 4,
          }}
          defaultValue={ingredientInfo.unit}
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

  useEffect(() => {
    saveIngredients();
  }, [tempIngredients]);

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
        custom: ingredient.custom,
        type: ingredient.type,
      };
      if (trimmedIngredient.name) {
        trimmedIngredients.push(trimmedIngredient);
      }
    });
    setEditingCocktailInfo({
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
        navigation.goBack();
      } catch (err) {
        alert(err);
      }
    }
  };

  const onDeleteUserCocktail = async () => {
    try {
      await handleDeleteUserCocktail(cocktail);
      navigation.pop(2);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={[g.bg.dark, { flex: 1 }]}>
      <Card containerStyle={[g.bg.secondary, g.br3, g.mb3, { padding: 0 }]}>
        <ScrollView>
          <View style={g.p4}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{ position: "absolute", right: 40, top: 24, zIndex: 10 }}
            >
              <FontAwesomeIcon icon={faTrashCan} size={28} style={g.dark} />
            </Pressable>
            <Text style={g.h3}>Name:</Text>
            <TextInput
              style={
                !errors.name
                  ? [
                      g.bg.white,
                      g.mt3,
                      g.br2,
                      g.ph2,
                      g.h4,
                      g.bdc.dark,
                      { borderWidth: 1, height: 40 },
                    ]
                  : [
                      g.bg.white,
                      g.mt3,
                      g.br2,
                      g.ph2,
                      g.h4,
                      g.bdc.error,
                      { borderWidth: 2, height: 40 },
                    ]
              }
              value={editingCocktailInfo.name}
              onChangeText={(name) => updateEditingCocktailInfo(name, "name")}
              onFocus={() => setErrors({ name: undefined })}
            />
            {errors.name && <Text style={[g.error, mt1]}>{errors.name}</Text>}
            <Text style={[g.h4, g.mt3]}>Ingredients:</Text>
            {renderIngredientContainers}
            <Pressable
              style={[g.mt3, g.bg.dark, g.br3, { alignSelf: "flex-start" }]}
              onPress={() => addIngredient()}
            >
              <FontAwesomeIcon icon={faPlus} style={g.primary} size={24} />
            </Pressable>
            <Text style={[g.h4, g.mt3]}>Recipe:</Text>
            <TextInput
              style={[
                g.bg.white,
                g.mt3,
                g.br2,
                g.ph2,
                g.h4,
                g.bdc.dark,
                { borderWidth: 1, height: recipeInputHeight },
              ]}
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
              containerStyle={[g.mt3, g.br2]}
              title="Save Changes"
              onPress={() => onUpdateUserCocktail()}
            />

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType={"fade"}
            >
              <View style={[g.m5, g.p6, g.bg.primary, g.br3]}>
                <Text
                  style={[g.white, g.h5]}
                >{`Are you sure you want to delete ${cocktail.name}?`}</Text>
                <View
                  style={[
                    g.mt5,
                    { justifyContent: "flex-start", flexDirection: "row" },
                  ]}
                >
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                    containerStyle={[g.mr5, g.br2]}
                  />
                  <Button
                    title="Delete"
                    onPress={() => onDeleteUserCocktail()}
                    containerStyle={[g.mr5, g.br2]}
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

export default MyCocktailEditor;
