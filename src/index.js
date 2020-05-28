const plugin = require("tailwindcss/plugin");

const heroPatterns = require("./patterns");

module.exports = plugin(
  function ({ addUtilities, theme }) {
    const colors = theme("colors", {});
    const patterns = theme("heroPatterns", {});
    const allowedShades = Object.values(theme("heroPatternsShades", {}));
    const allowedColors = Object.values(theme("heroPatternsColors", {}));

    // flatten colors
    const flattenColors = {};
    Object.entries(colors).map(([name, color]) => {
      if (typeof color === "object") {
        Object.entries(color).map(([nestedName, nestedColor]) => {
          if (allowedShades.length && !allowedShades.includes(nestedName)) {
            return;
          }
          if (allowedColors.length && !allowedColors.includes(name)) {
            return;
          }
          flattenColors[
            `${name}${nestedName === "default" ? "" : `-${nestedName}`}`
          ] = nestedColor;
        });
      } else {
        flattenColors[name] = color;
      }
    });

    let newUtilities = {};
    Object.entries(patterns).map(([name, pattern]) =>
      Object.entries(flattenColors).map(
        ([colorName, color]) =>
          (newUtilities[`.heropattern-${name}-${colorName}`] = {
            backgroundImage: pattern
              .replace("{{color}}", color.replace("#", "%23"))
              .replace("{{opacity}}", 1), // TODO: maybe map all opacities here
          })
      )
    );

    addUtilities(newUtilities);
  },
  {
    theme: {
      heroPatterns,
    },
  }
);
