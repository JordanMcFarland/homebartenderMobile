import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

// Need to manually change styling for selectdropdown components in cocktail creator, cocktail editor, and my bar editor

const xs = 4;
const sm = 8;
const md = 16;
const lg = 24;
const xl = 32;
const xxl = 40;

// manually change colors for checkbox components
const colors = {
  primary: "#B70D29",
  secondary: "#D3D3D3",
  dark: "#262626",
  white: "#fff",
  error: "red",
};

const g = StyleSheet.create({
  // Colors
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.secondary,
  },
  dark: {
    color: colors.dark,
  },
  white: {
    color: colors.white,
  },
  error: {
    color: colors.error,
  },
  bg: {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    dark: {
      backgroundColor: colors.dark,
    },
    white: {
      backgroundColor: colors.white,
    },
    error: {
      backgroundColor: colors.error,
    },
  },
  bdc: {
    primary: {
      borderColor: colors.primary,
    },
    secondary: {
      borderColor: colors.secondary,
    },
    dark: {
      borderColor: colors.dark,
    },
    error: {
      borderColor: colors.error,
    },
  },

  // Font Size
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 20,
  },
  h5: {
    fontSize: 16,
  },

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
  mt1: {
    marginTop: xs,
  },
  mt2: {
    marginTop: sm,
  },
  mt3: {
    marginTop: md,
  },
  mt4: {
    marginTop: lg,
  },
  mt5: {
    marginTop: xl,
  },
  mt6: {
    marginTop: xxl,
  },
  mr1: {
    marginRight: xs,
  },
  mr2: {
    marginRight: sm,
  },
  mr3: {
    marginRight: md,
  },
  mr4: {
    marginRight: lg,
  },
  mr5: {
    marginRight: xl,
  },
  mr6: {
    marginRight: xxl,
  },
  mb1: {
    marginBottom: xs,
  },
  mb2: {
    marginBottom: sm,
  },
  mb3: {
    marginBottom: md,
  },
  mb4: {
    marginBottom: lg,
  },
  mb5: {
    marginBottom: xl,
  },
  mb6: {
    marginBottom: xxl,
  },
  ml1: {
    marginLeft: xs,
  },
  ml2: {
    marginLeft: sm,
  },
  ml3: {
    marginLeft: md,
  },
  ml4: {
    marginLeft: lg,
  },
  ml5: {
    marginLeft: xl,
  },
  ml6: {
    marginLeft: xxl,
  },
  mh1: {
    marginHorizontal: xs,
  },
  mh2: {
    marginHorizontal: sm,
  },
  mh3: {
    marginHorizontal: md,
  },
  mh4: {
    marginHorizontal: lg,
  },
  mh5: {
    marginHorizontal: xl,
  },
  mh6: {
    marginHorizontal: xxl,
  },
  mv1: {
    marginVertical: xs,
  },
  mv2: {
    marginVertical: sm,
  },
  mv3: {
    marginVertical: md,
  },
  mv4: {
    marginVertical: lg,
  },
  mv5: {
    marginVertical: xl,
  },
  mv6: {
    marginVertical: xxl,
  },

  p1: {
    padding: xs,
  },
  p2: {
    padding: sm,
  },
  p3: {
    padding: md,
  },
  p4: {
    padding: lg,
  },
  p5: {
    padding: xl,
  },
  p6: {
    padding: xxl,
  },
  pt1: {
    paddingTop: xs,
  },
  pt2: {
    paddingTop: sm,
  },
  pt3: {
    paddingTop: md,
  },
  pt4: {
    paddingTop: lg,
  },
  pt5: {
    paddingTop: xl,
  },
  pt6: {
    paddingTop: xxl,
  },
  pr1: {
    paddingRight: xs,
  },
  pr2: {
    paddingRight: sm,
  },
  pr3: {
    paddingRight: md,
  },
  pr4: {
    paddingRight: lg,
  },
  pr5: {
    paddingRight: xl,
  },
  pr6: {
    paddingRight: xxl,
  },
  pb1: {
    paddingBottom: xs,
  },
  pb2: {
    paddingBottom: sm,
  },
  pb3: {
    paddingBottom: md,
  },
  pb4: {
    paddingBottom: lg,
  },
  pb5: {
    paddingBottom: xl,
  },
  pb6: {
    paddingBottom: xxl,
  },
  pl1: {
    paddingLeft: xs,
  },
  pl2: {
    paddingLeft: sm,
  },
  pl3: {
    paddingLeft: md,
  },
  pl4: {
    paddingLeft: lg,
  },
  pl5: {
    paddingLeft: xl,
  },
  pl6: {
    paddingLeft: xxl,
  },
  ph1: {
    paddingHorizontal: xs,
  },
  ph2: {
    paddingHorizontal: sm,
  },
  ph3: {
    paddingHorizontal: md,
  },
  ph4: {
    paddingHorizontal: lg,
  },
  ph5: {
    paddingHorizontal: xl,
  },
  ph6: {
    paddingHorizontal: xxl,
  },
  pv1: {
    paddingVertical: xs,
  },
  pv2: {
    paddingVertical: sm,
  },
  pv3: {
    paddingVertical: md,
  },
  pv4: {
    paddingVertical: lg,
  },
  pv5: {
    paddingVertical: xl,
  },
  pv6: {
    paddingVertical: xxl,
  },

  // Border Radius
  br1: {
    borderRadius: xs,
  },
  br2: {
    borderRadius: sm,
  },
  br3: {
    borderRadius: md,
  },
});

// g is global
// const g = StyleSheet.create({
//   colors: {
//     primary: colors.primary,
//     secondary: colors.secondary,
//     background: colors.background,
//   },
//   margins: {
//     m1: xs,
//     m2: sm,
//     m3: md,
//     m4: lg,
//     m5: xl,
//     m6: xxl,
//   },
//   padding: {
//     p1: xs,
//     p2: sm,
//     p3: md,
//     p4: lg,
//     p5: xl,
//     p6: xxl,
//   },
//   borderRadius: {
//     r1: xs,
//     r2: sm,
//     r3: md,
//   },
// });

export default g;
