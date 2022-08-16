var Airtable = require("airtable");
import { REACT_APP_AIRTABLE_BASE, REACT_APP_AIRTABLE_KEY } from "@env";

export const fetchCocktails = async () => {
  const response = await fetch(
    `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE}/COCKTAILS`,
    {
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_KEY}`,
      },
    }
  );
  const list = await response.json();

  return list;
};

export const fetchIngredients = async () => {
  const response = await fetch(
    `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE}/INGREDIENTS`,
    {
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_KEY}`,
      },
    }
  );
  const list = await response.json();

  return list;
};
