import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import g from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";

const MyBar = () => {
  const { user } = useContext(AuthContext);
  const [userBarCategories, setUserBarCategories] = useState([]);

  useEffect(() => {
    const newCategories = Object.keys(user.userBar);
    setUserBarCategories(newCategories);
  }, [user]);

  const renderMyBar = userBarCategories.map((category, index) => {
    if (user.userBar[category].length) {
      return (
        <View style={{ marginVertical: g.margins.m2 }} key={index}>
          <Text style={styles.subHeader}>{category}</Text>
          {user.userBar[category].map((ingredient) => {
            return (
              <Text style={styles.text} key={ingredient._id}>
                - {ingredient.name}
              </Text>
            );
          })}
        </View>
      );
    }
  });
  return (
    <View style={styles.container}>
      <Button
        title="What can I make?"
        onPress={() => console.log("navigate to display of what we can make!")}
        containerStyle={styles.button}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.mainScrollView}
      >
        {renderMyBar}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: g.colors.background,
    flex: 1,
  },
  scrollView: {
    backgroundColor: g.colors.primary,
    margin: g.margins.m2,
    borderRadius: g.borderRadius.r2,
    paddingHorizontal: g.padding.p4,
  },
  button: {
    borderRadius: g.borderRadius.r2,
    alignSelf: "center",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
});

export default MyBar;
