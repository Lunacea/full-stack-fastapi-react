import { useBreakpointValue } from "@chakra-ui/react"
import { useState } from "react"
import { SearchFormValues, SearchFormProps } from "../types"
import { MobileSearchForm } from "./MobileSearchForm"
import { DesktopSearchForm } from "./DesktopSearchForm"

export function SearchForm({ onSearch, initialValues }: SearchFormProps) {
  const [values, setValues] = useState<SearchFormValues>({
    location: initialValues?.location || "岩手県盛岡市",
    keyword: initialValues?.keyword || "",
    jobCategories: initialValues?.jobCategories || [],
    employmentTypes: initialValues?.employmentTypes || [],
    preferences: initialValues?.preferences || [],
    salary: initialValues?.salary || { type: "hourly", min: "", max: "" }
  })

  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleValuesChange = (newValues: SearchFormValues) => {
    setValues(newValues)
  }

  if (isMobile) {
    return (
      <MobileSearchForm
        values={values}
        onValuesChange={handleValuesChange}
        onSearch={onSearch}
        initialValues={initialValues}
      />
    )
  }

  return (
    <DesktopSearchForm
      values={values}
      onValuesChange={handleValuesChange}
      onSearch={onSearch}
      initialValues={initialValues}
    />
  )
} 