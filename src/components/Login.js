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
      alert(err);
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
        value={userInfo.password}
        placeholder="Password"
        style={styles.textInput}
        onChangeText={(password) => setUserInfo({ ...userInfo, password })}
        secureTextEntry
      />
      <Button onPress={onUserLogin}>Submit</Button>
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

export default Login;
