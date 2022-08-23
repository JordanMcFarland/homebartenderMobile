import React, { useState } from "react";
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import g from "../styles/styles";

const DraggableView = ({ color }) => {
  const [pan, setPan] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          //dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx < 200 && gesture.dy < 200) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), { ...styles.circle, backgroundColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default DraggableView;
