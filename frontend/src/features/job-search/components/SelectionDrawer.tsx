import {
  Button,
  VStack,
  HStack,
  Text,
  Box,
  useDisclosure
} from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { SelectOption } from "../types"

interface SelectionDrawerProps {
  title: string
  placeholder: string
  options: SelectOption[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  triggerButton?: React.ReactNode
}

export function SelectionDrawer({
  title,
  placeholder,
  options,
  selectedValues,
  onSelectionChange,
  triggerButton
}: SelectionDrawerProps) {
  const { open, onOpen, onClose } = useDisclosure()

  const getSelectedLabels = () => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(", ")
  }

  const handleOptionClick = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newSelectedValues)
  }

  const handleOverlayClick = () => {
    onClose()
  }

  const defaultTrigger = (
    <Button
      variant="outline"
      justifyContent="space-between"
      w="full"
      bg="gray.50"
      borderColor="gray.300"
      _hover={{ borderColor: "brand.500" }}
      _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
      onClick={onOpen}
    >
      <Text color={selectedValues.length > 0 ? "ui.text" : "gray.500"} fontSize="sm">
        {selectedValues.length > 0 ? getSelectedLabels() : placeholder}
      </Text>
      <FiChevronDown />
    </Button>
  )

  return (
    <>
      {triggerButton || defaultTrigger}

      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={1000}
        onClick={handleOverlayClick}
        transition="opacity 0.3s ease-in-out, visibility 0.3s ease-in-out"
        opacity={open ? 1 : 0}
        visibility={open ? "visible" : "hidden"}
        pointerEvents={open ? "auto" : "none"}
      >
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="white"
          borderTopRadius="16px"
          maxH="80vh"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
          transition="transform 0.3s ease-in-out"
          transform={open ? "translateY(0)" : "translateY(100%)"}
        >
          {/* Header */}
          <Box
            borderBottomWidth="1px"
            borderColor="gray.200"
            p={4}
            position="relative"
          >
            <Button
              position="absolute"
              right={4}
              top={4}
              size="sm"
              variant="ghost"
              onClick={onClose}
              aria-label="閉じる"
            >
              ✕
            </Button>
            <Text fontSize="lg" fontWeight="bold" color="ui.text">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.600" mt={1}>
              {selectedValues.length > 0 ? `${selectedValues.length}件選択中` : "選択してください"}
            </Text>
          </Box>

          {/* Body */}
          <Box p={4} overflowY="auto" maxH="calc(80vh - 80px)">
            <VStack gap={3} align="stretch">
              {options.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  justifyContent="flex-start"
                  w="full"
                  h="auto"
                  py={3}
                  px={4}
                  onClick={() => handleOptionClick(option.value)}
                  bg={selectedValues.includes(option.value) ? "brand.50" : "transparent"}
                  color={selectedValues.includes(option.value) ? "brand.600" : "ui.text"}
                  borderWidth={selectedValues.includes(option.value) ? "1px" : "0"}
                  borderColor="brand.200"
                  _hover={{
                    bg: selectedValues.includes(option.value) ? "brand.100" : "gray.50"
                  }}
                >
                  <HStack w="full" justify="space-between">
                    <Text fontSize="md">
                      {option.label}
                    </Text>
                    {selectedValues.includes(option.value) && (
                      <Box
                        w="6"
                        h="6"
                        borderRadius="full"
                        bg="brand.500"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        ✓
                      </Box>
                    )}
                  </HStack>
                </Button>
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  )
} 