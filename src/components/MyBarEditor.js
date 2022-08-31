import React, { useEffect, useContext, useState } from "react";
import { ScrollView, View } from "react-native";
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
        containerStyle={g.br2}
        title={ingredient.name}
        key={ingredient._id}
        checked={tempUserBar[currentCategory]?.some(
          (ing) => ing._id === ingredient._id
        )}
        onPress={() => toggleIngredient(ingredient)}
        checkedColor={g.primary.color}
        uncheckedColor={g.dark.color}
      />
    );
  });

  return (
    <View style={[g.bg.dark, { flex: 1 }]}>
      <SelectDropdown
        data={categories}
        defaultValue={currentCategory}
        onSelect={(option) => updateCurrentCategory(option)}
        buttonStyle={{
          marginTop: g.mt2.marginTop,
          marginHorizontal: g.mh2.marginHorizontal,
          borderRadius: g.br2.borderRadius,
          backgroundColor: g.bg.primary.backgroundColor,
          alignSelf: "center",
          height: 40,
        }}
      />
      <ScrollView style={[g.bg.secondary, g.m2, g.pt1, g.br2]}>
        {renderIngredients}
      </ScrollView>
    </View>
  );
};

export default MyBarEditor;
