var Airtable = require("airtable");

//************** HIDE THESE!! */
const apiKey = "keyZIhyFycya0jS1p";
const baseKey = "app9Q4GlbOBJoDqnK";

var base = new Airtable({ apiKey: apiKey }).base(baseKey);

export const fetchCocktails = async () => {
  const response = await fetch(
    `https://api.airtable.com/v0/${baseKey}/COCKTAILS`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const list = await response.json();

  return list;
};

export const fetchIngredients = async () => {
  const response = await fetch(
    `https://api.airtable.com/v0/${baseKey}/INGREDIENTS`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const list = await response.json();

  return list;
};
