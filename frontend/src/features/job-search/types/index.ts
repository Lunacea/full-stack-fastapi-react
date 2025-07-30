export interface SalaryRange {
  type: 'hourly' | 'daily' | 'monthly' | 'yearly'
  min: string
  max: string
}

export interface SearchFormValues {
  location: string
  keyword: string
  jobCategories: string[]
  employmentTypes: string[]
  preferences: string[]
  salary: SalaryRange
}

export interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void
  initialValues?: Partial<SearchFormValues>
}

export interface SelectOption {
  value: string
  label: string
} 