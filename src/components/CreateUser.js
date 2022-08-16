import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { createUserAccount } from "../helpers/homebartenderServer";
import { Button } from "@rneui/themed/dist/Button";

const CreateUser = ({ navigation }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    password: "",
  });

  const onCreateUserAccount = async () => {
    try {
      const response = await createUserAccount(newUserInfo);
      console.log(response);
      if (!response.success) {
        const error = response.err.message;
        throw error;
      } else {
        Alert.alert("Your account was created successfully!");
        navigation.navigate("Login");
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username :</Text>
      <TextInput
        value={newUserInfo.username}
        placeholder="Username"
        style={styles.textInput}
        onChangeText={(username) =>
          setNewUserInfo({ ...newUserInfo, username })
        }
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        value={newUserInfo.password}
        placeholder="Password"
        style={styles.textInput}
        onChangeText={(password) =>
          setNewUserInfo({ ...newUserInfo, password })
        }
        secureTextEntry
      />
      <Button style={styles.button} onPress={onCreateUserAccount}>
        Submit
      </Button>
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
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 30,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: "#fff",
  },
});

export default CreateUser;
