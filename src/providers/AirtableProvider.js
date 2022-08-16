import React, { useState, useEffect, useContext } from "react";
import { fetchCocktails, fetchIngredients } from "../helpers/airtable";
import { AuthContext } from "./AuthProvider";

export const AirtableContext = React.createContext({});

export const AirtableProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [ingredientCategories, setIngredientCategories] = useState([]);

  useEffect(() => {
    const fetchCocktailAirTable = async () => {
      try {
        const list = await fetchCocktails();
        const cocktailList = list.records
          .map((record) => {
            const { _id, name, requiredIngredients, recipe, image } =
              record.fields;
            const ingredientsArr = requiredIngredients.split(",");
            return {
              _id,
              name,
              requiredIngredients: ingredientsArr.map((item) => item.trim()),
              recipe,
              image,
            };
          })
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        setCocktails(cocktailList);
      } catch (e) {
        console.error(e);
      }
    };
    if (!cocktails.length) {
      fetchCocktailAirTable();
    }
  }, []);

  useEffect(() => {
    const fetchIngredientAirTable = async () => {
      try {
        const list = await fetchIngredients();

        // Create a list object with {category: ingredient array} pairs
        const listObj = {};
        //console.log(list);
        list.records.forEach((record) => {
          const _id = record.id;
          const { type, name } = record.fields;

          if (!listObj[type]) {
            listObj[type] = [];
          }

          listObj[type] = [...listObj[type], { _id, name }];
        });

        // Create category array and sort ingredients in each category
        const keyArr = Object.keys(listObj);
        keyArr.forEach((key) => {
          listObj[key] = listObj[key].sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        });

        // Set ingredient & ingredient category state
        setIngredients((prevState) => ({ ...prevState, ...listObj }));
        setIngredientCategories((prevState) => [...prevState, ...keyArr]);
      } catch (e) {
        console.error(e);
        setErr(true);
      }
    };
    fetchIngredientAirTable();
  }, []);

  return (
    <AirtableContext.Provider
      value={{
        cocktails,
        ingredients,
        ingredientCategories,
        setCocktails,
        setIngredients,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};
