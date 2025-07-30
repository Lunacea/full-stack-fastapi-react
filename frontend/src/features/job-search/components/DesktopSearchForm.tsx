import {
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Grid,
  GridItem,
  Box
} from "@chakra-ui/react"
import { FiSearch } from "react-icons/fi"
import { SearchFormValues, SearchFormProps } from "../types"
import { jobCategoryOptions, employmentTypeOptions, preferenceOptions } from "../constants/options"
import { SelectionDrawer } from "./SelectionDrawer"
import { SalaryDrawer } from "./SalaryDrawer"

interface DesktopSearchFormProps extends SearchFormProps {
  values: SearchFormValues
  onValuesChange: (values: SearchFormValues) => void
}

export function DesktopSearchForm({ values, onValuesChange, onSearch }: DesktopSearchFormProps) {
  const handleInputChange = (field: keyof SearchFormValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onValuesChange({
      ...values,
      [field]: e.target.value
    })
  }

  const handleMultiSelectChange = (field: 'jobCategories' | 'employmentTypes' | 'preferences') => (
    selectedValues: string[]
  ) => {
    onValuesChange({
      ...values,
      [field]: selectedValues
    })
  }

  const handleSalaryChange = (salary: SearchFormValues['salary']) => {
    onValuesChange({
      ...values,
      salary
    })
  }

  const handleSubmit = () => {
    onSearch(values)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Grid templateColumns="1fr 1fr 1fr auto" gap={4} alignItems="end">
      <GridItem>
        <Text fontSize="sm" color="ui.text-secondary" mb={2}>場所</Text>
        <Input
          placeholder="岩手県盛岡市"
          value={values.location}
          onChange={handleInputChange("location")}
          onKeyPress={handleKeyPress}
          bg="gray.50"
          border="1px"
          borderColor="gray.300"
          _hover={{ borderColor: "brand.500" }}
          _focus={{
            borderColor: "brand.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
          }}
        />
      </GridItem>
      <GridItem>
        <Text fontSize="sm" color="ui.text-secondary" mb={2}>キーワード</Text>
        <Input
          placeholder="職種、雇用形態、こだわりなど検索"
          value={values.keyword}
          onChange={handleInputChange("keyword")}
          onKeyPress={handleKeyPress}
          bg="gray.50"
          border="1px"
          borderColor="gray.300"
          _hover={{ borderColor: "brand.500" }}
          _focus={{
            borderColor: "brand.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
          }}
        />
      </GridItem>
      <GridItem>
        <Text fontSize="sm" color="ui.text-secondary" mb={2}>職種・雇用形態・こだわり</Text>
        <VStack gap={3} align="stretch">
          {/* 職種 */}
          <Box>
            <Text fontSize="xs" color="ui.text-secondary" mb={1}>職種</Text>
            <SelectionDrawer
              title="職種を選択"
              placeholder="職種"
              options={jobCategoryOptions}
              selectedValues={values.jobCategories}
              onSelectionChange={(values) => handleMultiSelectChange("jobCategories")(values)}
            />
          </Box>

          {/* 雇用形態 */}
          <Box>
            <Text fontSize="xs" color="ui.text-secondary" mb={1}>雇用形態</Text>
            <SelectionDrawer
              title="雇用形態を選択"
              placeholder="雇用形態"
              options={employmentTypeOptions}
              selectedValues={values.employmentTypes}
              onSelectionChange={(values) => handleMultiSelectChange("employmentTypes")(values)}
            />
          </Box>

          {/* こだわり */}
          <Box>
            <Text fontSize="xs" color="ui.text-secondary" mb={1}>こだわり</Text>
            <SelectionDrawer
              title="こだわりを選択"
              placeholder="こだわり"
              options={preferenceOptions}
              selectedValues={values.preferences}
              onSelectionChange={(values) => handleMultiSelectChange("preferences")(values)}
            />
          </Box>

          {/* 給与 */}
          <Box>
            <Text fontSize="xs" color="ui.text-secondary" mb={1}>給与</Text>
            <SalaryDrawer
              salary={values.salary}
              onSalaryChange={handleSalaryChange}
            />
          </Box>
        </VStack>
      </GridItem>
      <GridItem>
        <Button
          colorScheme="brand"
          onClick={handleSubmit}
          size="lg"
          px={8}
          height="48px"
          fontWeight="bold"
        >
          <FiSearch />
          検索
        </Button>
      </GridItem>
    </Grid>
  )
} 