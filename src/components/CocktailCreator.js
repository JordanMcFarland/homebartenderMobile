import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import { Button } from "@rneui/themed/dist/Button";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base";
import { CheckBox } from "@rneui/base/dist/CheckBox";
import { AuthContext } from "../providers/AuthProvider";
import g from "../styles/styles";

const CocktailCreator = ({ navigation }) => {
  const [newCocktail, setNewCocktail] = useState({
    name: "",
    requiredIngredients: [],
    recipe: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [tempIngredients, setTempIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeInputHeight, setRecipeInputHeight] = useState(40);

  const { ingredients, ingredientCategories } = useContext(AirtableContext);
  const { handlePostUserCocktail } = useContext(AuthContext);

  const updateNewCocktail = (value, name) => {
    setNewCocktail({ ...newCocktail, [name]: value });
  };

  const toggleIngredient = (ingredient) => {
    if (!tempIngredients.includes(ingredient.name)) {
      setTempIngredients([...tempIngredients, ingredient.name]);
    } else {
      setTempIngredients(
        tempIngredients.filter((item) => item !== ingredient.name)
      );
    }
  };

  const saveIngredients = () => {
    setNewCocktail({
      ...newCocktail,
      requiredIngredients: tempIngredients,
    });
  };

  const onPostUserCocktail = async (newCocktail) => {
    if (validate()) {
      try {
        await handlePostUserCocktail(newCocktail);
        setTempIngredients([]);
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

  const renderStockIngredientList = ingredientCategories.map(
    (category, index) => {
      return (
        <View key={index} style={styles.ingredientCardView}>
          <Text style={styles.subheaderText}>{category}</Text>
          <View>
            {ingredients[category].map((ingredient) => {
              return (
                <Card
                  key={ingredient._id}
                  containerStyle={styles.ingredientCard}
                >
                  <CheckBox
                    containerStyle={styles.ingredientCardCheck}
                    textStyle={styles.ingredientCardCheckText}
                    title={ingredient.name}
                    checkedColor={"#B70D29"}
                    onPress={() => toggleIngredient(ingredient)}
                    checked={tempIngredients.includes(ingredient.name)}
                  />
                </Card>
              );
            })}
          </View>
        </View>
      );
    }
  );

  const renderChosenIngredients = newCocktail.requiredIngredients.map(
    (ingredient, index) => {
      return (
        <Text style={{ fontSize: 20 }} key={index}>
          {`- ${ingredient}`}
        </Text>
      );
    }
  );

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!newCocktail.name) {
      setErrors({ name: "A cocktail name is required." });
      valid = false;
    }
    return valid;
  };

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
            {newCocktail.requiredIngredients.length ? (
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: 8,
                  borderColor: g.colors.background,
                  borderWidth: 1,
                }}
              >
                <ScrollView
                  style={{ maxHeight: 256 }}
                  nestedScrollEnabled={true}
                >
                  <View style={styles.ingredientScrollView}>
                    {renderChosenIngredients}
                  </View>
                </ScrollView>
              </View>
            ) : (
              <></>
            )}

            <Button
              containerStyle={styles.button}
              title="Show Ingredients"
              color="#505050"
              onPress={() => setModalVisible(true)}
            />
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
                onPostUserCocktail(newCocktail);
              }}
            />
          </View>
        </ScrollView>

        <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
          <View style={styles.modalView}>
            <ScrollView>{renderStockIngredientList}</ScrollView>

            <View style={styles.buttonContainer}>
              <Button
                containerStyle={{
                  marginHorizontal: 8,
                  borderRadius: 8,
                }}
                title="Clear"
                onPress={() => {
                  setTempIngredients([]);
                }}
              />
              <Button
                title="Save Ingredients"
                containerStyle={{
                  marginHorizontal: 8,
                  borderRadius: 8,
                }}
                onPress={() => {
                  saveIngredients();
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
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
  modalView: {
    flex: 1,
    margin: 16,
    borderRadius: 24,
    backgroundColor: "#B70D29",
  },
  subheaderText: {
    paddingTop: 12,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  ingredientCardView: {
    padding: 8,
  },
  ingredientCard: {
    backgroundColor: "#262626",
    borderColor: "#505050",
    borderRadius: 8,
    padding: 0,
  },
  ingredientCardCheck: {
    fontSize: 20,
    backgroundColor: "#262626",
  },
  ingredientCardCheckText: {
    color: "#fff",
    fontSize: 20,
  },
  buttonContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});

export default CocktailCreator;
