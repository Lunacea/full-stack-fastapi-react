import { createSystem, defaultConfig } from "@chakra-ui/react"
import { buttonRecipe } from "./theme/button.recipe"

export const system = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
    },
    body: {
      fontSize: "0.875rem",
      margin: 0,
      padding: 0,
      color: "#3F3F3F",
    },
    ".main-link": {
      color: "ui.main",
      fontWeight: "bold",
    },
  },
  theme: {
    tokens: {
      colors: {
        ui: {
          main: { value: "#EF671F" },
          text: { value: "#3F3F3F" },
          "text-secondary": { value: "#656565" },
        },
        brand: {
          50: { value: "#FFF5F0" },
          100: { value: "#FFE6D6" },
          200: { value: "#FFCCAD" },
          300: { value: "#FFB284" },
          400: { value: "#FF995B" },
          500: { value: "#EF671F" },
          600: { value: "#E55A1A" },
          700: { value: "#DB4D15" },
          800: { value: "#D14010" },
          900: { value: "#C7330B" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})
