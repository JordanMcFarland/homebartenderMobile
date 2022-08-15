import { Button } from "@rneui/base";
import React, { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const { login } = useContext(AuthContext);

  const onUserLogin = async () => {
    try {
      await login(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username :</Text>
      <TextInput
        value={userInfo.username}
        placeholder="Username"
        style={styles.textInput}
        onChangeText={(username) => setUserInfo({ ...userInfo, username })}
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        onChangeText={(password) => setUserInfo({ ...userInfo, password })}
        secureTextEntry
      />
      <Button style={styles.button} onPress={onUserLogin}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  text: {
    marginLeft: 40,
    fontSize: 20,
  },
  textInput: {
    height: 40,
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
  },
  button: {},
});

export default Login;
