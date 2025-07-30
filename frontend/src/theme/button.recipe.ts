import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    colorPalette: "brand",
  },
  variants: {
    variant: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
        },
        _active: {
          bg: "brand.700",
        },
      },
      outline: {
        border: "1px solid",
        borderColor: "brand.500",
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
        _active: {
          bg: "brand.100",
        },
      },
      ghost: {
        bg: "transparent",
        color: "gray.600",
        _hover: {
          bg: "gray.100",
          color: "brand.500",
        },
        _active: {
          bg: "brand.50",
          color: "brand.600",
        },
      },
    },
    size: {
      sm: {
        px: 3,
        py: 1,
        fontSize: "sm",
        borderRadius: "md",
      },
      md: {
        px: 4,
        py: 2,
        fontSize: "md",
        borderRadius: "md",
      },
      lg: {
        px: 6,
        py: 3,
        fontSize: "lg",
        borderRadius: "lg",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
