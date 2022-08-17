import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const xs = 4;
const sm = 8;
const md = 16;
const lg = 24;
const xl = 32;
const xxl = 40;

const colors = {
  red: "#B70D29",
};

// g is global
const g = StyleSheet.create({
  m1: {
    margin: xs,
  },
  m2: {
    margin: sm,
  },
  m3: {
    margin: md,
  },
  m4: {
    margin: lg,
  },
  m5: {
    margin: xl,
  },
  m6: {
    xxl,
  },
  red: {
    color: colors.red,
  },
});

export default g;
