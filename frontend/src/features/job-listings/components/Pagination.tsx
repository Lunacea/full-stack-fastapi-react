import { Button, HStack, Text, Flex } from "@chakra-ui/react"
import { PaginationProps } from "../types"

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          variant={i === currentPage ? "solid" : "outline"}
          colorScheme={i === currentPage ? "brand" : "gray"}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <Flex justify="center" mt={8}>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          前のページ
        </Button>
        {renderPageNumbers()}
        <Text fontSize="sm" color="gray.600">...</Text>
        <Button
          size="sm"
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          次のページ
        </Button>
      </HStack>
    </Flex>
  )
} 