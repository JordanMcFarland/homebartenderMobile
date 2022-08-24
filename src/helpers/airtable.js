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
  if (response.ok) {
    const list = await response.json();

    return list;
  }
  throw new Error("Could not fetch cocktails");
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
  if (response.ok) {
    const list = await response.json();

    return list;
  }
  throw new Error("Could not fetch ingredients");
};
