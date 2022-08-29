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
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
  },
  margins: {
    m1: xs,
    m2: sm,
    m3: md,
    m4: lg,
    m5: xl,
    m6: xxl,
  },
  padding: {
    p1: xs,
    p2: sm,
    p3: md,
    p4: lg,
    p5: xl,
    p6: xxl,
  },
  borderRadius: {
    r1: xs,
    r2: sm,
    r3: md,
  },
});

export default g;
