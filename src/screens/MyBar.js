import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "@rneui/base";
import g from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";
import SlidingView from "./components/SlidingView";

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
              <SlidingView
                key={ingredient._id}
                containerStyle={[g.mv1, g.br1]}
                sliderStyle={[
                  g.bg.secondary,
                  g.br1,
                  g.pv3,
                  {
                    borderWidth: 1,
                  },
                ]}
                buttonText="Remove"
                buttonStyle={[
                  g.bg.dark,
                  g.br1,
                  {
                    width: 200,
                  },
                ]}
                buttonTextStyle={g.white}
                sliderActivateDistance={-200}
              >
                <Text style={[g.h4, { alignSelf: "center" }]}>
                  {ingredient.name}
                </Text>
              </SlidingView>
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
