export interface JobListing {
  id: number
  title: string
  company: string
  location: string
  salary: string
  workHours: string
  employmentType: string
  description: string
  features: string[]
  postedTime?: string
}

export interface JobCardProps {
  job: JobListing
  isFavorite: boolean
  onToggleFavorite: (jobId: number) => void
  onViewDetails: (jobId: number) => void
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
} 