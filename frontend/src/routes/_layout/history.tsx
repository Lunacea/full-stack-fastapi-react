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
import { FiMapPin, FiClock, FiDollarSign, FiHeart, FiShare2 } from "react-icons/fi"
import { mockJobs } from "@/shared"
import { useState, useEffect } from "react"
import { getHistory, clearHistory, addToFavorites, removeFromFavorites, isFavorite, getHistoryCount } from "@/utils/cookies"

export const Route = createFileRoute("/_layout/history")({
  component: History,
})

function History() {
  const [historyJobIds, setHistoryJobIds] = useState<number[]>([])
  const [historyCount, setHistoryCount] = useState(0)

  // 閲覧履歴の求人を取得
  const historyJobs = mockJobs.filter(job => historyJobIds.includes(job.id))

  // 閲覧履歴をクリア
  const handleClearHistory = () => {
    clearHistory()
    setHistoryJobIds([])
    setHistoryCount(0)
  }

  // お気に入りを切り替え
  const handleToggleFavorite = (jobId: number) => {
    if (isFavorite(jobId)) {
      removeFromFavorites(jobId)
    } else {
      addToFavorites(jobId)
    }
  }

  // 閲覧履歴に追加
  const handleViewDetails = (jobId: number) => {
    // 閲覧履歴は既に追加されているので、ここでは詳細ページに遷移
    console.log(`求人詳細ページに遷移: ${jobId}`)
  }

  // コンポーネントマウント時に初期化
  useEffect(() => {
    const history = getHistory()
    setHistoryJobIds(history)
    setHistoryCount(getHistoryCount())
  }, [])

  return (
    <Container maxW="1200px" py={6}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Flex justify="space-between" align="center">
            <VStack gap={2} align="start">
              <Text fontSize="2xl" fontWeight="bold" color="ui.text">
                閲覧履歴
              </Text>
              <Text fontSize="sm" color="gray.600">
                {historyCount}件の閲覧履歴があります
              </Text>
            </VStack>
            <Button
              colorScheme="gray"
              size="sm"
              onClick={handleClearHistory}
              _hover={{ bg: "gray.600" }}
              _active={{ bg: "gray.700" }}
            >
              履歴をクリア
            </Button>
          </Flex>
        </Box>

        {/* Job Listings */}
        <VStack gap={4} align="stretch">
          {historyJobs.length > 0 ? (
            historyJobs.map((job) => (
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
                      color={isFavorite(job.id) ? "brand.500" : "gray.400"}
                      _hover={{ color: "brand.500", bg: "brand.50" }}
                      _active={{ color: "brand.600", bg: "brand.100" }}
                      onClick={() => handleToggleFavorite(job.id)}
                      aria-label={isFavorite(job.id) ? "お気に入りから削除" : "お気に入りに追加"}
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
                閲覧履歴がありません
              </Text>
              <Text fontSize="sm" color="gray.500">
                求人を閲覧すると履歴に追加されます
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Container>
  )
}

export default History 