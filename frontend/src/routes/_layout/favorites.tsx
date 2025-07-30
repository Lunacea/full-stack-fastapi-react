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
import { createFileRoute } from "@tanstack/react-router"
import { FiMapPin, FiClock, FiDollarSign, FiHeart, FiShare2, FiTrash2 } from "react-icons/fi"
import { mockJobs } from "@/shared"
import { useState, useEffect } from "react"
import { getFavorites, removeFromFavorites, addToHistory, getFavoritesCount } from "@/utils/cookies"

export const Route = createFileRoute("/_layout/favorites")({
  component: Favorites,
})

function Favorites() {
  const [favoriteJobIds, setFavoriteJobIds] = useState<number[]>([])
  const [favoriteCount, setFavoriteCount] = useState(0)

  // お気に入り求人を取得
  const favoriteJobs = mockJobs.filter(job => favoriteJobIds.includes(job.id))

  // お気に入りを削除
  const handleRemoveFavorite = (jobId: number) => {
    removeFromFavorites(jobId)
    setFavoriteJobIds(prev => prev.filter(id => id !== jobId))
    setFavoriteCount(prev => prev - 1)
  }

  // 閲覧履歴に追加
  const handleViewDetails = (jobId: number) => {
    addToHistory(jobId)
    // ここで求人詳細ページに遷移する処理を追加できます
    console.log(`求人詳細ページに遷移: ${jobId}`)
  }

  // コンポーネントマウント時に初期化
  useEffect(() => {
    const favorites = getFavorites()
    setFavoriteJobIds(favorites)
    setFavoriteCount(getFavoritesCount())
  }, [])

  return (
    <Container maxW="1200px" py={6}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <VStack gap={4} align="start">
            <Text fontSize="2xl" fontWeight="bold" color="ui.text">
              お気に入り求人
            </Text>
            <Text fontSize="sm" color="gray.600">
              {favoriteCount}件のお気に入り求人があります
            </Text>
          </VStack>
        </Box>

        {/* Job Listings */}
        <VStack gap={4} align="stretch">
          {favoriteJobs.length > 0 ? (
            favoriteJobs.map((job) => (
              <Box key={job.id} bg="white" p={6} borderRadius="lg" shadow="sm">
                <Flex justify="space-between" align="start" mb={4}>
                  <VStack align="start" gap={2} flex={1}>
                    <Text fontSize="lg" fontWeight="bold" color="ui.text">
                      {job.title}
                    </Text>
                    <Text fontSize="md" color="brand.500" fontWeight="medium">
                      {job.company}
                    </Text>

                    <HStack gap={4} color="gray.600" fontSize="sm">
                      <HStack gap={1}>
                        <FiMapPin />
                        <Text>{job.location}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <FiClock />
                        <Text>{job.workHours}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <FiDollarSign />
                        <Text>{job.salary}</Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <HStack gap={2}>
                    <Button
                      variant="ghost"
                      size="sm"
                      color="brand.500"
                      _hover={{ color: "brand.600", bg: "brand.50" }}
                      _active={{ color: "brand.700", bg: "brand.100" }}
                      onClick={() => handleRemoveFavorite(job.id)}
                      aria-label="お気に入りから削除"
                    >
                      <FiHeart />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      color="gray.400"
                      _hover={{ color: "brand.500", bg: "brand.50" }}
                      _active={{ color: "brand.600", bg: "brand.100" }}
                      onClick={() => handleViewDetails(job.id)}
                      aria-label="詳細を見る"
                    >
                      <FiShare2 />
                    </Button>
                  </HStack>
                </Flex>

                <Flex gap={2} mb={3} wrap="wrap">
                  <Badge colorScheme="brand" variant="subtle">
                    {job.employmentType}
                  </Badge>
                  {job.features.slice(0, 4).map((feature, index) => (
                    <Badge key={index} colorScheme="gray" variant="outline" fontSize="xs">
                      {feature}
                    </Badge>
                  ))}
                </Flex>

                <Text fontSize="sm" color="gray.700" lineHeight="tall">
                  {job.description}
                </Text>

                <Box borderTop="1px" borderColor="gray.200" my={4} />

                <Flex justify="space-between" align="center">
                  <Text fontSize="xs" color="gray.500">
                    {job.postedTime || "24時間前"}
                  </Text>
                  <Button
                    colorScheme="brand"
                    size="sm"
                    onClick={() => handleViewDetails(job.id)}
                    _hover={{ bg: "brand.600" }}
                    _active={{ bg: "brand.700" }}
                  >
                    詳しくは登録から
                  </Button>
                </Flex>
              </Box>
            ))
          ) : (
            <Box bg="white" p={8} borderRadius="lg" shadow="sm" textAlign="center">
              <Text fontSize="lg" color="gray.600" mb={2}>
                お気に入りの求人がありません
              </Text>
              <Text fontSize="sm" color="gray.500">
                求人一覧からお気に入りに追加してください
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Container>
  )
} 