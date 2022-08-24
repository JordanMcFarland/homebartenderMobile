import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

const xs = 4;
const sm = 8;
const md = 16;
const lg = 24;
const xl = 32;
const xxl = 40;

const colors = {
  primary: "#B70D29",
  secondary: "#D3D3D3",
  background: "#262626",
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
    margin: xxl,
  },
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
  },
});

export default g;
