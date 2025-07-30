import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Badge
} from "@chakra-ui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch, FiTrash2, FiClock, FiFilter } from "react-icons/fi"
import { useState, useEffect } from "react"
import {
  getSavedSearches,
  deleteSavedSearch,
  getSavedSearchesCount
} from "@/utils/cookies"
import { SavedSearch } from "@/utils/cookies"

export const Route = createFileRoute("/_layout/saved")({
  component: SavedSearchesPage,
})

function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [savedCount, setSavedCount] = useState(0)
  const navigate = useNavigate()

  // 保存された検索条件を更新
  const updateSavedSearches = () => {
    const searches = getSavedSearches()
    setSavedSearches(searches)
    setSavedCount(getSavedSearchesCount())
  }

  // 保存された検索条件を削除
  const handleDeleteSearch = (searchId: string) => {
    deleteSavedSearch(searchId)
    updateSavedSearches()
  }

  // 保存された検索条件を実行
  const handleExecuteSearch = (search: SavedSearch) => {
    const searchParams: Record<string, string> = {}

    if (search.query) {
      searchParams.q = search.query
    }
    if (search.filters.employmentType) {
      searchParams.employmentType = search.filters.employmentType
    }
    if (search.filters.jobCategory) {
      searchParams.jobCategory = search.filters.jobCategory
    }
    if (search.filters.salaryType) {
      searchParams.salaryType = search.filters.salaryType
    }

    navigate({
      to: "/",
      search: searchParams
    })
  }

  // 日付をフォーマット
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1日前"
    if (diffDays < 7) return `${diffDays}日前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`
    return `${Math.floor(diffDays / 30)}ヶ月前`
  }

  // コンポーネントマウント時に初期化
  useEffect(() => {
    updateSavedSearches()
  }, [])

  return (
    <Container maxW="1200px" py={6}>
      {/* Header */}
      <Box bg="white" p={6} borderRadius="lg" shadow="sm" mb={6}>
        <VStack gap={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold" color="ui.text">
            保存条件・履歴
          </Text>
          <Text fontSize="sm" color="gray.600">
            {savedCount}件の保存された検索条件
          </Text>
        </VStack>
      </Box>

      {/* Saved Searches */}
      <VStack gap={4} align="stretch">
        {savedSearches.length > 0 ? (
          savedSearches.map((search) => (
            <Box key={search.id} bg="white" p={6} borderRadius="lg" shadow="sm">
              <Flex justify="space-between" align="start" mb={4}>
                <VStack align="start" gap={2} flex={1}>
                  <HStack gap={2} align="center">
                    <FiSearch color="#EF671F" />
                    <Text fontSize="lg" fontWeight="bold" color="ui.text">
                      {search.name}
                    </Text>
                  </HStack>

                  {search.query && (
                    <Text fontSize="sm" color="gray.600">
                      検索キーワード: {search.query}
                    </Text>
                  )}

                  <HStack gap={2} wrap="wrap">
                    {search.filters.employmentType && (
                      <Badge colorScheme="brand" variant="subtle" fontSize="xs">
                        雇用形態: {search.filters.employmentType}
                      </Badge>
                    )}
                    {search.filters.jobCategory && (
                      <Badge colorScheme="brand" variant="subtle" fontSize="xs">
                        職種: {search.filters.jobCategory}
                      </Badge>
                    )}
                    {search.filters.salaryType && (
                      <Badge colorScheme="brand" variant="subtle" fontSize="xs">
                        給与: {search.filters.salaryType}
                      </Badge>
                    )}
                  </HStack>
                </VStack>

                <HStack gap={2}>
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    _hover={{ color: "brand.500" }}
                    onClick={() => handleDeleteSearch(search.id)}
                    aria-label="削除"
                  >
                    <FiTrash2 />
                  </Button>
                </HStack>
              </Flex>

              <Box borderTop="1px" borderColor="gray.200" my={4} />

              <Flex justify="space-between" align="center">
                <HStack gap={2} color="gray.500" fontSize="xs">
                  <FiClock />
                  <Text>{formatDate(search.createdAt)}</Text>
                </HStack>
                <Button
                  colorScheme="brand"
                  size="sm"
                  leftIcon={<FiFilter />}
                  onClick={() => handleExecuteSearch(search)}
                >
                  この条件で検索
                </Button>
              </Flex>
            </Box>
          ))
        ) : (
          <Box bg="white" p={8} borderRadius="lg" shadow="sm" textAlign="center">
            <Text fontSize="lg" color="gray.600" mb={2}>
              保存された検索条件がありません
            </Text>
            <Text fontSize="sm" color="gray.500" mb={4}>
              検索条件を保存すると、ここに表示されます
            </Text>
            <Button colorScheme="brand" size="sm">
              求人一覧に戻る
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default SavedSearchesPage 