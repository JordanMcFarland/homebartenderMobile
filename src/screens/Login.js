import { Button } from "@rneui/base";
import React, { useContext, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import g from "../styles/styles";

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
    <View style={[g.pv6, g.ph3, g.bg.dark, { flex: 1 }]}>
      <Text style={[g.ml6, g.h4, g.white]}>Username :</Text>
      <TextInput
        value={userInfo.username}
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
        onChangeText={(username) => setUserInfo({ ...userInfo, username })}
      />
      <Text style={[g.ml6, g.h4, g.white]}>Password:</Text>
      <TextInput
        value={userInfo.password}
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
        onChangeText={(password) => setUserInfo({ ...userInfo, password })}
        secureTextEntry
      />
      <Button onPress={onUserLogin}>Submit</Button>
    </View>
  );
};

export default Login;
