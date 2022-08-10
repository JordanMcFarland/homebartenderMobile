import React, { useState } from "react";
import { fetchCocktails, fetchIngredients } from "../helpers/airtable";

export const AirtableContext = React.createContext({});

export const AirtableProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState({});

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
