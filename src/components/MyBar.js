import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "@rneui/base";
import g from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";

const MyBar = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userBarCategories, setUserBarCategories] = useState([]);

  useEffect(() => {
    const newCategories = Object.keys(user.userBar);
    setUserBarCategories(newCategories);
  }, [user]);

  const renderMyBar = userBarCategories.map((category, index) => {
    if (user.userBar[category].length) {
      return (
        <View style={g.m2} key={index}>
          <Text style={[g.h3, { fontWeight: "bold" }]}>{category}</Text>
          {user.userBar[category].map((ingredient) => {
            return (
              <Text style={g.h5} key={ingredient._id}>
                - {ingredient.name}
              </Text>
            );
          })}
        </View>
      );
    }
  });

  return (
    <View style={[g.bg.dark, { flex: 1 }]}>
      <Button
        title="What can I make?"
        onPress={() => navigation.navigate("Craftable Cocktails")}
        containerStyle={[g.br2, { alignSelf: "center" }]}
      />
      {user.userBar && (
        <ScrollView style={[g.bg.primary, g.m2, g.br2, g.ph4]}>
          {renderMyBar}
        </ScrollView>
      )}
    </View>
  );
};

export default MyBar;
