import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import MainNavigator from "../navigators/MainNavigator";

const Main = () => {
  const { user, login } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  // Handle User Login
  // useEffect(() => {
  //   const loginUser = async () => {
  //     try {
  //       await login();
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setLoading(false);
  //     }
  //   };
  //   loginUser();
  // }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#262626",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return <MainNavigator />;
  }
};

export default Main;
