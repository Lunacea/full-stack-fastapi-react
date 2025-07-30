export interface SearchStats {
  location: string
  totalJobs: number
}

export interface JobFilters {
  jobCategories: Array<{ value: string; label: string }>
  employmentTypes: Array<{ value: string; label: string }>
  salaryTypes: Array<{ value: string; label: string }>
} 