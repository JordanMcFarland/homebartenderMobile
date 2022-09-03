import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "@rneui/base";
import g, { width } from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";
import SlidingView from "./components/SlidingView";

const MyBar = ({ navigation }) => {
  const { user, removeSingleIngredientFromUserBar, setTempUserBar } =
    useContext(AuthContext);
  const [userBarCategories, setUserBarCategories] = useState([]);

  useEffect(() => {
    const newCategories = Object.keys(user.userBar);
    setUserBarCategories(newCategories);
  }, [user]);

  const removeIngredient = (category, ingredientId) => {
    try {
      let updatedUserBar = {};
      const updatedIngredientCategory = user.userBar[category].filter(
        (ing) => ing._id !== ingredientId
      );
      updatedUserBar = {
        ...user.userBar,
        [category]: updatedIngredientCategory,
      };

      removeSingleIngredientFromUserBar(updatedUserBar);
    } catch (err) {
      alert(err);
    }
  };

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
                  g.br2,
                  g.pv3,
                  g.bdc.dark,
                  {
                    borderWidth: 2,
                  },
                ]}
                buttonText="Remove"
                buttonStyle={[
                  g.bg.dark,
                  g.br2,
                  {
                    width: width / 5,
                  },
                ]}
                buttonTextStyle={g.white}
                sliderActivateDistance={-(width / 5)}
                onPress={() => removeIngredient(category, ingredient._id)}
              >
                <Text style={[g.h4, g.ml6]}>{ingredient.name}</Text>
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
