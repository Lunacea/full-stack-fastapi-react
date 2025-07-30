import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  Badge
} from "@chakra-ui/react"
import { FiMapPin, FiClock, FiDollarSign, FiHeart, FiShare2 } from "react-icons/fi"
import { JobCardProps } from "../types"

export function JobCard({ job, isFavorite, onToggleFavorite, onViewDetails }: JobCardProps) {
  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
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
            color={isFavorite ? "brand.500" : "gray.400"}
            _hover={{ color: "brand.500", bg: "brand.50" }}
            _active={{ color: "brand.600", bg: "brand.100" }}
            onClick={() => onToggleFavorite(job.id)}
            aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
          >
            <FiHeart />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            color="gray.400"
            _hover={{ color: "brand.500", bg: "brand.50" }}
            _active={{ color: "brand.600", bg: "brand.100" }}
            onClick={() => onViewDetails(job.id)}
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
          onClick={() => onViewDetails(job.id)}
          _hover={{ bg: "brand.600" }}
          _active={{ bg: "brand.700" }}
        >
          詳しくは登録から
        </Button>
      </Flex>
    </Box>
  )
} 