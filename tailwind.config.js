const patterns = require("./src/patterns");

function getGradient(theme, color) {
  const hex = theme("colors")[color][400];
  return ["transparent 0%", `${hex} 72%`, `${hex} 100%`];
}

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "pink",
  "primary",
];

module.exports = {
  purge: ["./docs/index.html"],
  theme: {
    extend: {
      colors: {
        // palette generated with https://javisperez.github.io/tailwindcolorshades/#/?Tolopea=2b0447&tv=1
        primary: {
          default: "#2b0447",
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#2b0447",
        },
      },
      linearGradientDirections: {
        r: "to right",
      },
      linearGradientColors: (theme) =>
        colors.reduce((accum, color) => {
          accum[`transparent-to-${color}`] = getGradient(theme, color);
          return accum;
        }, {}),
      heroPatterns: {
        ellipsis: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cpattern id='pattern-circles' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='20'%3E%3C/circle%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23pattern-circles)'%3E%3C/rect%3E%3C/svg%3E");`,
      },
      heroPatternsShades: ["100", "400", "500"],
    },
  },
  variants: {},
  plugins: [require("tailwindcss-gradients"), require("./src")],
};
