import { baseUrl } from "../shared/baseUrl";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return token;
  } else {
    const err = new Error("Could not find user token.");
    throw err;
  }
};

// *** User Calls ***
export const loginUser = async (creds) => {
  try {
    const response = await fetch(baseUrl + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });

    if (!response.ok) {
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }

    const json = await response.json();

    if (json.success) {
      SecureStore.setItemAsync("token", json.token);
    }
    if (!json.success) {
      const error = new Error("Error " + json.status);
      error.response = json;
      throw error;
    }

    const sortedUserCocktails = json.user.userCocktails.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    json.user.userCocktails = sortedUserCocktails;

    return json.user;
  } catch (err) {
    console.error(err);
  }
};

export const createUserAccount = async (newUserInfo) => {
  try {
    const response = await fetch(baseUrl + "users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    });

    const json = await response.json();

    if (json.err) {
      const error = new Error(
        `Error ${response.status}: ${json.err.name} - ${json.err.message}`
      );
      error.response = json;
      throw error;
    }

    return json;
  } catch (err) {
    return { err: err };
  }
};

// *** User cocktails ***
export const postCocktail = async (userCocktail) => {
  if (!userCocktail) throw new Error("Please provide cocktail information.");
  const token = await getToken();

  const response = await fetch(baseUrl + "users/usercocktails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userCocktail),
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    const error = json.error;
    throw new Error(error);
  }
};

export const getUserCocktails = async () => {
  try {
    const token = await getToken();

    const response = await fetch(baseUrl + "users/usercocktails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }

    const json = await response.json();

    if (json) {
      return json.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    } else {
      const error = new Error("Error " + json.status);
      error.response = json;
      throw error;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserCocktail = async (userCocktailId) => {
  const token = await getToken();

  const response = await fetch(
    baseUrl + `users/usercocktails/${userCocktailId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    const error = json.error;
    throw new Error(error);
  }
};

export const updateUserCocktail = async (userCocktailId, editedCocktail) => {
  const token = await getToken();

  const response = await fetch(
    baseUrl + `users/usercocktails/${userCocktailId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editedCocktail.name,
        requiredIngredients: editedCocktail.requiredIngredients,
        recipe: editedCocktail.recipe,
      }),
    }
  );

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    const error = json.error;
    throw new Error(error);
  }
};

// *** User Favorites ***

export const getUserFavorites = async () => {
  try {
    const token = getToken();

    const response = await fetch(baseUrl + "users/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }

    const json = await response.json();

    if (json) {
      return json;
    } else {
      const error = new Error("Error " + json.status);
      error.response = json;
      throw error;
    }
  } catch (err) {
    console.error(err);
  }
};

export const postUserFavorite = async (cocktailInfo) => {
  const token = await getToken();

  const response = await fetch(baseUrl + "users/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cocktailInfo),
  });

  const json = await response.json();
  if (response.ok) {
    if (json.err) {
      const error = json.err;
      throw error;
    }

    if (json.userFavorites) {
      return json;
    }
  } else {
    const error = new Error("Error " + json.status);
    error.response = json;
    throw error;
  }
};

export const deleteUserFavorite = async (cocktailInfo) => {
  const token = await getToken();

  const response = await fetch(baseUrl + "users/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cocktailInfo),
  });

  const json = await response.json();
  if (response.ok) {
    if (json.err) {
      const error = json.err;
      throw error;
    }

    if (json.userFavorites) {
      return json;
    }
  } else {
    const error = new Error("Error " + json.status);
    error.response = json;
    throw error;
  }
};

// *** User Bar ***

export const updateUserBar = async (updatedUserBar) => {
  try {
    const token = await getToken();

    const response = await fetch(baseUrl + "users/userBar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserBar),
    });

    if (!response.ok) {
      const error = response;
      throw error;
    }

    const json = await response.json();

    if (json) {
      return json;
    } else {
      const error = new Error("Error " + json.status);
      error.response = json;
      throw error;
    }
  } catch (err) {
    console.error(err);
  }
};
