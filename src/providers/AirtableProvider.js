import React, { useState, useEffect, useContext } from "react";
import { fetchCocktails, fetchIngredients } from "../helpers/airtable";
import { AuthContext } from "./AuthProvider";

export const AirtableContext = React.createContext({});

export const AirtableProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState({});

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchCocktailAirTable = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    if (!cocktails.length) {
      fetchCocktailAirTable();
    }
  }, []);

  return (
    <AirtableContext.Provider
      value={{
        cocktails,
        ingredients,
        setCocktails,
        setIngredients,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};
