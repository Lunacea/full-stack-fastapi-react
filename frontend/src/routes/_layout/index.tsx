import {
  Box,
  Container,
  Text,
  VStack,
  Spinner
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  addToHistory
} from "@/utils/cookies"
import { SearchForm, SearchFormValues } from "@/features/job-search"
import { JobCard, Pagination } from "@/features/job-listings"
import { jobSearchApi, SearchResult } from "@/shared/services/jobSearchApi"

export const Route = createFileRoute("/_layout/")({
  component: JobListings,
})

function JobListings() {
  const search = useSearch({ from: "/_layout/" })
  const searchQuery = search.q || ""
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [searchStats, setSearchStats] = useState({ location: "岩手県盛岡市", totalJobs: 0 })

  // お気に入り状態を更新
  const updateFavoriteStates = () => {
    const states: Record<number, boolean> = {}
    if (searchResult?.jobs) {
      searchResult.jobs.forEach(job => {
        states[job.id] = isFavorite(job.id)
      })
    }
    setFavoriteStates(states)
  }

  // お気に入りを切り替え
  const toggleFavorite = (jobId: number) => {
    if (favoriteStates[jobId]) {
      removeFromFavorites(jobId)
    } else {
      addToFavorites(jobId)
    }
    updateFavoriteStates()
  }

  // 閲覧履歴に追加
  const addToHistoryAndNavigate = (jobId: number) => {
    addToHistory(jobId)
    // ここで求人詳細ページに遷移する処理を追加できます
    console.log(`求人詳細ページに遷移: ${jobId}`)
  }

  // 検索処理
  const handleSearch = async (values: SearchFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await jobSearchApi.searchJobs({
        ...values,
        page: 1,
        limit: 10
      })
      setSearchResult(result)
      setCurrentPage(1)
    } catch (err) {
      setError("検索中にエラーが発生しました。もう一度お試しください。")
      console.error("検索エラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // ページ変更処理
  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    setError(null)

    try {
      // 現在の検索条件を取得（実際の実装では検索条件を状態として保持する必要があります）
      const result = await jobSearchApi.searchJobs({
        location: "",
        keyword: "",
        jobCategories: [],
        employmentTypes: [],
        preferences: [],
        salary: { type: 'hourly', min: '', max: '' },
        page,
        limit: 10
      })
      setSearchResult(result)
      setCurrentPage(page)
    } catch (err) {
      setError("ページの読み込み中にエラーが発生しました。")
      console.error("ページ変更エラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // 初期データ読み込み
  const loadInitialData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [stats, result] = await Promise.all([
        jobSearchApi.getSearchStats(),
        jobSearchApi.searchJobs({
          location: "",
          keyword: "",
          jobCategories: [],
          employmentTypes: [],
          preferences: [],
          salary: { type: 'hourly', min: '', max: '' },
          page: 1,
          limit: 10
        })
      ])

      setSearchStats(stats)
      setSearchResult(result)
    } catch (err) {
      setError("データの読み込み中にエラーが発生しました。")
      console.error("初期データ読み込みエラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // コンポーネントマウント時に初期化
  useEffect(() => {
    loadInitialData()
  }, [])

  // 検索結果が変更されたらお気に入り状態を更新
  useEffect(() => {
    updateFavoriteStates()
  }, [searchResult])

  return (
    <Box bg="#F5F5F5" minH="100vh">
      {/* Search Filters - 背景を白に、マージンなし */}
      <Box bg="white" p={6} mb={6}>
        <Container maxW="1200px">
          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color="ui.text">
              {searchStats.location} の求人・仕事・採用
              {searchQuery && (
                <Text as="span" fontSize="md" color="brand.500" ml={2}>
                  「{searchQuery}」の検索結果
                </Text>
              )}
            </Text>

            <SearchForm onSearch={handleSearch} />

            <Text fontSize="sm" color="gray.600">
              {searchResult ? `${searchResult.totalCount.toLocaleString()}件` : `${searchStats.totalJobs.toLocaleString()}件`}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Job Listings */}
      <Container maxW="1200px" py={6}>
        {isLoading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="lg" color="brand.500" />
            <Text mt={4} color="gray.600">検索中...</Text>
          </Box>
        ) : error ? (
          <Box bg="red.50" border="1px" borderColor="red.200" borderRadius="lg" p={4} mb={4}>
            <Text color="red.600" fontSize="sm">
              ⚠️ {error}
            </Text>
          </Box>
        ) : (
          <VStack gap={4} align="stretch">
            {searchResult && searchResult.jobs.length > 0 ? (
              searchResult.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isFavorite={favoriteStates[job.id] || false}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={addToHistoryAndNavigate}
                />
              ))
            ) : (
              <Box bg="white" p={8} borderRadius="lg" shadow="sm" textAlign="center">
                <Text fontSize="lg" color="gray.600" mb={2}>
                  {searchQuery ? `「${searchQuery}」に一致する求人が見つかりませんでした` : "求人が見つかりませんでした"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  検索条件を変更してお試しください
                </Text>
              </Box>
            )}
          </VStack>
        )}

        {/* Pagination */}
        {searchResult && searchResult.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={searchResult.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </Box>
  )
}

export default JobListings
