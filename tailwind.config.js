const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

// Info about Prose Dark (Light) Mode:
// https://github.com/tailwindlabs/tailwindcss-typography/issues/69#issuecomment-752946920
// tailwind.config.js

// Add custom states (valid:)
// https://github.com/tailwindlabs/tailwindcss/discussions/2465

module.exports = {
  purge: ["_includes/**/*.njk", "_content/**/*.njk", "_includes/**/*.css"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: colors.white,
        gray: colors.blueGray,
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme("colors.gray.400"),
              '[class~="lead"]': {
                color: theme("colors.gray.300"),
              },
              a: {
                color: theme("colors.gray.400"),
              },
              strong: {
                color: theme("colors.gray.400"),
              },
              "ol > li::before": {
                color: theme("colors.gray.400"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600"),
              },
              hr: {
                borderColor: theme("colors.gray.200"),
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.600"),
              },
              h1: {
                color: theme("colors.gray.400"),
              },
              h2: {
                color: theme("colors.gray.400"),
              },
              h3: {
                color: theme("colors.gray.400"),
              },
              h4: {
                color: theme("colors.gray.400"),
              },
              "figure figcaption": {
                color: theme("colors.gray.400"),
              },
              code: {
                color: theme("colors.gray.400"),
              },
              "a code": {
                color: theme("colors.gray.400"),
              },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.400"),
                borderBottomColor: theme("colors.gray.400"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.600"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
    borderColor: ({ after }) => after(["valid"]),
    borderWidth: ({ after }) => after(["valid"]),
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant, e }) {
      addVariant("valid", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`valid${separator}${className}`)}:valid`;
        });
      });
    }),
  ],
};
