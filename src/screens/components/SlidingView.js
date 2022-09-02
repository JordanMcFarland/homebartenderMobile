import React, { useState } from "react";
import { useEffect } from "react";
import { Animated, View, PanResponder, Pressable, Text } from "react-native";
import g, { width } from "../../styles/styles";

const SlidingView = ({
  children,
  containerStyle,
  sliderStyle,
  buttonStyle,
  buttonTextStyle,
  buttonText,
  onPress,
  sliderActivateDistance,
}) => {
  //const [sliderActivated, setSliderActivated] = useState(false);
  const [pan, setPan] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({ x: pan.x._value, y: pan.y._value });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      Animated.timing(pan, {
        toValue:
          gesture.dx < sliderActivateDistance ||
          pan.x._value < sliderActivateDistance
            ? { x: sliderActivateDistance, y: 0 }
            : { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[pan.getLayout(), { zIndex: 10 }, sliderStyle]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
      <Pressable
        style={[
          {
            position: "absolute",
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
            height: "100%",
          },
          buttonStyle,
        ]}
        onPress={onPress}
      >
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default SlidingView;
