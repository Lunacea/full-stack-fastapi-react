import {
  Button,
  VStack,
  HStack,
  Text,
  Box,
  useDisclosure,
  Input
} from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { SalaryRange } from "../types"
import { salaryTypeOptions } from "../constants/options"

interface SalaryDrawerProps {
  salary: SalaryRange
  onSalaryChange: (salary: SalaryRange) => void
  triggerButton?: React.ReactNode
}

export function SalaryDrawer({
  salary,
  onSalaryChange,
  triggerButton
}: SalaryDrawerProps) {
  const { open, onOpen, onClose } = useDisclosure()

  const getSalaryDisplay = () => {
    const typeLabel = salaryTypeOptions.find(option => option.value === salary.type)?.label || "時給"
    if (salary.min && salary.max) {
      return `${typeLabel} ${salary.min}〜${salary.max}`
    } else if (salary.min) {
      return `${typeLabel} ${salary.min}〜`
    } else if (salary.max) {
      return `${typeLabel} 〜${salary.max}`
    }
    return "給与を選択"
  }

  const handleTypeChange = (type: string) => {
    onSalaryChange({
      ...salary,
      type: type as SalaryRange['type']
    })
  }

  const handleMinChange = (min: string) => {
    onSalaryChange({
      ...salary,
      min
    })
  }

  const handleMaxChange = (max: string) => {
    onSalaryChange({
      ...salary,
      max
    })
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
      <Text color={salary.min || salary.max ? "ui.text" : "gray.500"} fontSize="sm">
        {getSalaryDisplay()}
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
              給与を選択
            </Text>
            <Text fontSize="sm" color="gray.600" mt={1}>
              給与タイプと金額範囲を設定してください
            </Text>
          </Box>

          {/* Body */}
          <Box p={4} overflowY="auto" maxH="calc(80vh - 80px)">
            <VStack gap={6} align="stretch">
              {/* 給与タイプ */}
              <Box>
                <Text fontSize="md" fontWeight="bold" color="ui.text" mb={3}>
                  給与タイプ
                </Text>
                <VStack gap={2} align="stretch">
                  {salaryTypeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      justifyContent="flex-start"
                      w="full"
                      h="auto"
                      py={3}
                      px={4}
                      onClick={() => handleTypeChange(option.value)}
                      bg={salary.type === option.value ? "brand.50" : "transparent"}
                      color={salary.type === option.value ? "brand.600" : "ui.text"}
                      borderWidth={salary.type === option.value ? "1px" : "0"}
                      borderColor="brand.200"
                      _hover={{
                        bg: salary.type === option.value ? "brand.100" : "gray.50"
                      }}
                    >
                      <HStack w="full" justify="space-between">
                        <Text fontSize="md">
                          {option.label}
                        </Text>
                        {salary.type === option.value && (
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

              {/* 金額範囲 */}
              <Box>
                <Text fontSize="md" fontWeight="bold" color="ui.text" mb={3}>
                  金額範囲
                </Text>
                <VStack gap={3} align="stretch">
                  <HStack gap={2}>
                    <Box flex={1}>
                      <Text fontSize="sm" color="ui.text-secondary" mb={1}>
                        下限
                      </Text>
                      <Input
                        placeholder="下限"
                        value={salary.min}
                        onChange={(e) => handleMinChange(e.target.value)}
                        size="md"
                      />
                    </Box>
                    <Text fontSize="md" color="gray.500" alignSelf="end" pb={2}>
                      〜
                    </Text>
                    <Box flex={1}>
                      <Text fontSize="sm" color="ui.text-secondary" mb={1}>
                        上限
                      </Text>
                      <Input
                        placeholder="上限"
                        value={salary.max}
                        onChange={(e) => handleMaxChange(e.target.value)}
                        size="md"
                      />
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  )
} 