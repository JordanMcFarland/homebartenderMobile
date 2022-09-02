import React, { useContext, useEffect, useState } from "react";
import { Text, View, ToastAndroid, Dimensions, ScrollView } from "react-native";
import { Button } from "@rneui/base/dist/Button";
import { AuthContext } from "../providers/AuthProvider";
import g, { width } from "../styles/styles";
import SlidingView from "./components/SlidingView";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base";

const Home = () => {
  const [randomStockCocktail, setRandomStockCocktail] = useState({});
  const [userMostRecentCocktail, setUserMostRecentCocktail] = useState({});

  const { user } = useContext(AuthContext);
  const { cocktails, cocktailLoading } = useContext(AirtableContext);

  useEffect(() => {
    const randomCocktail = getRandomStockCocktail();
    setRandomStockCocktail(randomCocktail);
    if (user) {
      const userCocktail = getUserMostRecentCocktail();
      setUserMostRecentCocktail(userCocktail);
    }
  }, [user]);
  // DRAGGABLE EXPERIMENT //
  // const [draggableArray, setDraggableArray] = useState([
  //   "blue",
  //   "yellow",
  //   "red",
  // ]);
  // const renderDraggableArray = draggableArray.map((color, index) => {
  //   return <DraggableView key={index} color={color} />;
  // });

  const getRandomStockCocktail = () => {
    const randNum = Math.floor(Math.random() * cocktails.length);
    return cocktails[randNum];
  };

  // Use the date?
  const getUserMostRecentCocktail = () => {
    const recentUserCocktail =
      user.userCocktails[user.userCocktails.length - 1];
    return recentUserCocktail;
  };

  return (
    <View style={[g.bg.dark, { flex: 1 }]}>
      <Text style={[g.primary, g.h1, g.pr3, g.pt3, { marginLeft: "auto" }]}>
        {user && `Hello, ${user.username}!`}
      </Text>
      <SlidingView
        containerStyle={{
          width: "100%",
          alignSelf: "center",
        }}
        sliderStyle={[
          g.bg.primary,
          g.bdc.secondary,
          { borderWidth: 3, justifyContent: "center" },
        ]}
        buttonStyle={g.bg.secondary}
        buttonText="Delete"
        onPress={() => console.log("Pressed")}
        sliderActivateDistance={-(width / 4)}
      >
        <Text style={{ height: 40, alignSelf: "center" }}>Hey</Text>
      </SlidingView>
      <ScrollView
        contentContainerStyle={[
          g.pb3,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          },
        ]}
        style={g.mt2}
      >
        <View
          style={[
            g.mt3,
            g.mh3,
            { flexDirection: "column", alignItems: "center" },
          ]}
        >
          <Text style={[g.primary, g.h3, g.mh2]}>
            Why not try this cocktail today?
          </Text>
          <Card
            containerStyle={[
              g.bg.primary,
              g.br2,
              g.mh3,
              g.bdc.secondary,
              { width: 276 },
            ]}
          >
            <Card.Title style={[g.white, g.h3]}>
              {randomStockCocktail.name}
            </Card.Title>
            <Card.Divider />
            <Text style={[g.h4, g.mt2]}>Ingredients:</Text>
            <View style={g.mt2}>
              {randomStockCocktail.requiredIngredients?.map(
                (ingredient, index) => {
                  return (
                    <Text style={g.h5} key={index}>
                      - {ingredient}
                    </Text>
                  );
                }
              )}
            </View>
            <Text style={[g.h4, g.mt2]}>Recipe:</Text>
            <Text style={[g.h5, g.mt2]}>{randomStockCocktail.recipe}</Text>
          </Card>
        </View>
        {userMostRecentCocktail && user ? (
          <View
            style={[
              g.mt3,
              g.mh3,
              { flexDirection: "column", alignItems: "center" },
            ]}
          >
            <Text style={[g.primary, g.h3, g.mh2]}>
              Your most recent creation.
            </Text>
            <Card
              containerStyle={[
                g.br2,
                g.mh3,
                g.bg.primary,
                g.bdc.secondary,
                { width: 276 },
              ]}
            >
              <Card.Title style={[g.white, g.h3]}>
                {userMostRecentCocktail.name}
              </Card.Title>
              <Card.Divider />
              <Text style={[g.h4, g.mt2]}>Ingredients:</Text>
              <View style={g.mt2}>
                {userMostRecentCocktail.requiredIngredients?.map(
                  (ingredient, index) => {
                    const ingredientString =
                      `- ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`.replace(
                        /  +/g,
                        " "
                      );
                    return (
                      <Text style={g.h5} key={index}>
                        {ingredientString}
                      </Text>
                    );
                  }
                )}
              </View>
              <Text style={[g.h4, g.mt2]}>Recipe:</Text>
              <Text style={[g.h5, g.mt2]}>{userMostRecentCocktail.recipe}</Text>
            </Card>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
