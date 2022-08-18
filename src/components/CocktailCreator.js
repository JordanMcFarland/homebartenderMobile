import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed/dist/Button";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/themed";
import { CheckBox } from "@rneui/base/dist/CheckBox";
import { AuthContext } from "../providers/AuthProvider";

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
        setNewCocktail({
          name: "",
          requiredIngredients: [],
          recipe: "",
          image: "",
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  const renderStockIngredientList = ingredientCategories.map(
    (category, index) => {
      return (
        <View key={index} style={styles.cardView}>
          <Text style={styles.subheaderText}>{category}</Text>
          <View>
            {ingredients[category].map((ingredient) => {
              return (
                <Card key={ingredient._id} containerStyle={styles.card}>
                  <CheckBox
                    containerStyle={styles.cardCheck}
                    textStyle={styles.cardCheckText}
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
        <Text style={{ ...styles.text, fontSize: 20 }} key={index}>
          {`- ${ingredient}`}
        </Text>
      );
    }
  );

  const validate = () => {
    let valid = true;
    if (!newCocktail.name) {
      setErrors({ name: "A cocktail name is required." });
      valid = false;
    }
    return valid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: </Text>
      <TextInput
        style={
          errors.name
            ? { ...styles.textInput, borderColor: "red", borderWidth: 2 }
            : styles.textInput
        }
        value={newCocktail.name}
        onChangeText={(name) => updateNewCocktail(name, "name")}
        onFocus={() => setErrors({})}
      />
      {errors.name && (
        <Text style={{ color: "red", marginTop: 4 }}>{errors.name}</Text>
      )}
      <Text style={styles.text}>Ingredients: </Text>
      {newCocktail.requiredIngredients.length ? (
        <ScrollView
          style={{
            maxHeight: "25%",
            backgroundColor: "#999999",
            borderRadius: 8,
            marginTop: 16,
          }}
          contentContainerStyle={{ padding: 8 }}
        >
          {renderChosenIngredients}
        </ScrollView>
      ) : (
        <></>
      )}

      <Button
        containerStyle={styles.button}
        title="Show Ingredients"
        color="#505050"
        onPress={() => setModalVisible(true)}
      />
      <Text style={styles.text}>Recipe: </Text>
      <TextInput
        style={{ ...styles.textInput, height: recipeInputHeight }}
        value={newCocktail.recipe}
        multiline={true}
        onChangeText={(recipe) => updateNewCocktail(recipe, "recipe")}
        onContentSizeChange={(e) => {
          setRecipeInputHeight(e.nativeEvent.contentSize.height);
        }}
      />
      <Button
        containerStyle={{ ...styles.button, alignSelf: "center" }}
        title="Submit"
        onPress={() => {
          console.log(errors);
          onPostUserCocktail(newCocktail);
        }}
      />

      <View style={styles.centeredView}>
        <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
          <View style={styles.modalView}>
            <ScrollView>{renderStockIngredientList}</ScrollView>

            <View style={styles.buttonContainer}>
              <Button
                containerStyle={{
                  width: "30%",
                }}
                title="Clear"
                onPress={() => {
                  setTempIngredients([]);
                }}
              />
              <Button
                title="Save Ingredients"
                containerStyle={{
                  width: "45%",
                }}
                onPress={() => {
                  saveIngredients();
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 40,
    backgroundColor: "#262626",
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20,
  },
  textInput: {
    height: 40,
    padding: 8,
    marginTop: 20,
    //marginBottom: 30,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: "#fff",
  },
  centeredView: {
    alignContent: "center",
    justifyContent: "center",
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
  cardView: {
    padding: 8,
  },
  card: {
    backgroundColor: "#262626",
    borderColor: "#505050",
    borderRadius: 8,
    padding: 0,
  },
  cardCheck: {
    fontSize: 20,
    backgroundColor: "#262626",
  },
  cardCheckText: {
    color: "#fff",
    fontSize: 20,
  },
  buttonContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginVertical: 20,
    alignSelf: "flex-start",
  },
});

export default CocktailCreator;
