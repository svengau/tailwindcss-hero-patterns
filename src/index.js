const plugin = require("tailwindcss/plugin");

const heroPatterns = require("./patterns");

module.exports = plugin(
  function ({ addUtilities, theme }) {
    const allowedShades = theme('heroPatternsShades', [])
    const allowedColors = theme('heroPatternsColors', [])
    const allowedOpacities = theme('heroPatternsOpacities', ['10', '50', '90'])

    const patterns = theme('heroPatterns', {})
    const colors = theme('colors', {})
    const opacity = Object.fromEntries(
      Object.entries(theme('opacity', {})).filter(
        ([key]) => !allowedOpacities.length || allowedOpacities.includes(key)
      )
    )

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

    const newUtilities = {};
    Object.entries(patterns).map(([name, pattern]) => {
      Object.entries(flattenColors).map(([colorName, color]) => {
        const coloredPattern = pattern.replace('{{color}}', color.toString().replace('#', '%23'))

        newUtilities[`.heropattern-${name}-${colorName}`] = {
          backgroundImage: coloredPattern
            .replace("{{opacity}}", 1),
        };
        Object.entries(opacity).map(([opacityName, opacityValue]) => {
          newUtilities[`.heropattern-${name}-${colorName}\\/${opacityName}`] = {
            backgroundImage: coloredPattern.replace("{{opacity}}", opacityValue),
          };
        });
      });
    });

    addUtilities(newUtilities);
  },
  {
    theme: {
      heroPatterns,
    },
  }
);
