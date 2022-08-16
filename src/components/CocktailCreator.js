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
import { postCocktail } from "../helpers/homebartenderServer";
import { AuthContext } from "../providers/AuthProvider";

const CocktailCreator = () => {
  const [newCocktail, setNewCocktail] = useState({
    name: "",
    requiredIngredients: [],
    recipe: "",
    image: "",
  });
  const [tempIngredients, setTempIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeInputHeight, setRecipeInputHeight] = useState(40);

  const { ingredients, ingredientCategories } = useContext(AirtableContext);
  const { handlePostUserCocktail } = useContext(AuthContext);

  const updateNewCocktail = (value, name) => {
    setNewCocktail({ ...newCocktail, [name]: value });
  };

  const toggleIngredient = (ingredient) => {
    if (!tempIngredients.includes(ingredient)) {
      setTempIngredients([...tempIngredients, ingredient]);
    } else {
      setTempIngredients(tempIngredients.filter((item) => item !== ingredient));
    }
  };

  const saveIngredients = () => {
    setNewCocktail({
      ...newCocktail,
      requiredIngredients: tempIngredients,
    });
  };

  const renderIngredientList = ingredientCategories.map((category, index) => {
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
                  checked={tempIngredients.includes(ingredient)}
                />
              </Card>
            );
          })}
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: </Text>
      <TextInput
        style={styles.textInput}
        value={newCocktail.name}
        onChangeText={(name) => updateNewCocktail(name, "name")}
      />
      <Text style={styles.text}>Ingredients: </Text>
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
          console.log(newCocktail);
          handlePostUserCocktail(newCocktail);
        }}
      />

      <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            {renderIngredientList}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              containerStyle={{
                width: "25%",
              }}
              title="Clear"
              onPress={() => {
                setTempIngredients([]);
              }}
            />
            <Button
              title="Save Ingredients"
              containerStyle={{
                width: "25%",
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#262626",
    flex: 1,
  },
  text: {
    marginLeft: 40,
    fontSize: 20,
    color: "#fff",
  },
  textInput: {
    height: 40,
    textAlignVertical: "top",
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 30,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: "#fff",
  },
  centeredView: {
    justifyContent: "center",
    backgroundColor: "#B70D29",
    paddingBottom: 25,
    margin: 10,
    borderRadius: 25,
  },
  modalView: {
    alignSelf: "center",
    width: "100%",
    margin: 10,
    borderRadius: 25,
  },
  subheaderText: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardView: {
    padding: 15,
    borderRadius: 15,
  },
  card: {
    backgroundColor: "#262626",
    borderColor: "#505050",
    borderRadius: 15,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingLeft: 40,
    marginVertical: 20,
    alignSelf: "flex-start",
  },
});

export default CocktailCreator;
