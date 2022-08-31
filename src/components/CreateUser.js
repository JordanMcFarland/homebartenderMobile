import React, { useState } from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { createUserAccount } from "../helpers/homebartenderServer";
import { Button } from "@rneui/themed/dist/Button";
import g from "../styles/styles";

const CreateUser = ({ navigation }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    password: "",
  });

  const onCreateUserAccount = async () => {
    try {
      const response = await createUserAccount(newUserInfo);
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
    <View style={[g.pv6, g.ph3, g.bg.dark, { flex: 1 }]}>
      <Text style={[g.ml6, g.h4, g.white]}>Username :</Text>
      <TextInput
        value={newUserInfo.username}
        placeholder="Username"
        style={[
          g.mh6,
          g.mv4,
          g.p2,
          g.br2,
          g.h4,
          g.bg.white,
          { borderWidth: 1, height: 40 },
        ]}
        onChangeText={(username) =>
          setNewUserInfo({ ...newUserInfo, username })
        }
      />
      <Text style={[g.ml6, g.h4, g.white]}>Password:</Text>
      <TextInput
        value={newUserInfo.password}
        placeholder="Password"
        style={[
          g.mh6,
          g.mv4,
          g.p2,
          g.br2,
          g.h4,
          g.bg.white,
          { borderWidth: 1, height: 40 },
        ]}
        onChangeText={(password) =>
          setNewUserInfo({ ...newUserInfo, password })
        }
        secureTextEntry
      />
      <Button onPress={onCreateUserAccount}>Submit</Button>
    </View>
  );
};

export default CreateUser;
