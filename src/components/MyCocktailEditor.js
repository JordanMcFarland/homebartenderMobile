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
} from "react-native";
import g from "../styles/styles";
import { Button, ButtonGroup, Card } from "@rneui/base";
import { AuthContext } from "../providers/AuthProvider";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const MyCocktailEditor = ({ route, navigation }) => {
  const cocktail = route.params;

  const [editingCocktailInfo, setEditingCocktailInfo] = useState({
    ...cocktail,
  });
  const [errors, setErrors] = useState({});
  const [recipeInputHeight, setRecipeInputHeight] = useState(40);
  const [modalVisible, setModalVisible] = useState(false);

  const { handleUpdateUserCocktail, handleDeleteUserCocktail } =
    useContext(AuthContext);

  const updateEditingCocktailInfo = (value, name) => {
    setEditingCocktailInfo({ ...editingCocktailInfo, [name]: value });
  };

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
            {editingCocktailInfo.requiredIngredients && (
              <View style={{ marginTop: 16 }}>
                {editingCocktailInfo.requiredIngredients.map(
                  (ingredient, index) => {
                    return (
                      <Text
                        key={index}
                        style={{ fontSize: 16 }}
                      >{`- ${ingredient}`}</Text>
                    );
                  }
                )}
              </View>
            )}
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
