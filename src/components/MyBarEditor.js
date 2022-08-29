import React, { useEffect, useContext, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { CheckBox } from "@rneui/base/dist/CheckBox";
import { AirtableContext } from "../providers/AirtableProvider";
import g from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";

const MyBarEditor = () => {
  const { ingredients, ingredientCategories } = useContext(AirtableContext);
  const { user, tempUserBar, setTempUserBar } = useContext(AuthContext);

  const [categories, setCategories] = useState(ingredientCategories);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  useEffect(() => {
    setTempUserBar({ ...user.userBar });
  }, []);

  const updateCurrentCategory = (option) => setCurrentCategory(option);

  const toggleIngredient = (ingredient) => {
    let updatedIngredientCategoryArray = [];
    if (!tempUserBar[currentCategory]) {
      tempUserBar[currentCategory] = [];
    }

    if (
      tempUserBar[currentCategory].some((ing) => ing._id === ingredient._id)
    ) {
      updatedIngredientCategoryArray = tempUserBar[currentCategory].filter(
        (ing) => ing._id !== ingredient._id
      );
    } else {
      updatedIngredientCategoryArray = [
        ...tempUserBar[currentCategory],
        ingredient,
      ];
    }
    setTempUserBar({
      ...tempUserBar,
      [currentCategory]: updatedIngredientCategoryArray,
    });
  };

  const renderIngredients = ingredients[currentCategory].map((ingredient) => {
    return (
      <CheckBox
        containerStyle={styles.checkboxContainer}
        title={ingredient.name}
        key={ingredient._id}
        checked={tempUserBar[currentCategory]?.some(
          (ing) => ing._id === ingredient._id
        )}
        onPress={() => toggleIngredient(ingredient)}
        checkedColor={g.colors.primary}
      />
    );
  });

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={categories}
        defaultValue={currentCategory}
        onSelect={(option) => updateCurrentCategory(option)}
        buttonStyle={styles.dropDownButton}
      />
      <ScrollView style={styles.scrollView}>{renderIngredients}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: g.colors.background,
    flex: 1,
  },
  scrollView: {
    backgroundColor: g.colors.secondary,
    margin: g.margins.m2,
    paddingTop: g.padding.p1,
    borderRadius: g.borderRadius.r2,
  },
  dropDownButton: {
    alignSelf: "center",
    marginTop: g.margins.m2,
    marginHorizontal: g.margins.m2,
    borderRadius: g.borderRadius.r2,
    backgroundColor: g.colors.primary,
    height: 40,
  },
  checkboxContainer: {
    borderRadius: g.borderRadius.r2,
  },
});

export default MyBarEditor;
