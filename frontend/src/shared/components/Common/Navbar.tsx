import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue
} from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import { FiHeart, FiSettings, FiSmartphone, FiClock } from "react-icons/fi"
import { useState, useEffect } from "react"
import { getFavoritesCount, getHistoryCount, getSavedSearchesCount } from "@/utils/cookies"

function Navbar() {
  const display = useBreakpointValue({ base: "none", md: "flex" })
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [historyCount, setHistoryCount] = useState(0)
  const [savedSearchesCount, setSavedSearchesCount] = useState(0)

  // 統計情報を更新する関数
  const updateStats = () => {
    setFavoritesCount(getFavoritesCount())
    setHistoryCount(getHistoryCount())
    setSavedSearchesCount(getSavedSearchesCount())
  }

  // コンポーネントマウント時に統計情報を取得
  useEffect(() => {
    updateStats()
  }, [])

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.300"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo - モバイルでは中央、デスクトップでは左 */}
        <Box flex={display === "none" ? 1 : "none"} />
        <Link to="/">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="brand.500"
          >
            Stanby
          </Text>
        </Link>
        <Box flex={display === "none" ? 1 : "none"} />

        {/* Navigation Links - デスクトップのみ表示 */}
        <HStack gap={6} display={display}>
          <Link to="/favorites">
            <Button
              variant="ghost"
              size="sm"
              color="ui.text"
              _hover={{ color: "brand.500" }}
              _active={{ color: "brand.600" }}
            >
              <FiHeart />
              お気に入り{favoritesCount}
            </Button>
          </Link>

          <Link to="/history">
            <Button
              variant="ghost"
              size="sm"
              color="ui.text"
              _hover={{ color: "brand.500" }}
              _active={{ color: "brand.600" }}
            >
              <FiClock />
              閲覧履歴{historyCount}
            </Button>
          </Link>

          <Link to="/saved">
            <Button
              variant="ghost"
              size="sm"
              color="ui.text"
              _hover={{ color: "brand.500" }}
              _active={{ color: "brand.600" }}
            >
              <FiSettings />
              保存条件・履歴{savedSearchesCount > 0 && `(${savedSearchesCount})`}
            </Button>
          </Link>
        </HStack>

        {/* App Download Button */}
        <Button
          variant="solid"
          colorScheme="brand"
          size="sm"
          _hover={{ bg: "brand.600" }}
          _active={{ bg: "brand.700" }}
        >
          <FiSmartphone />
          アプリ
        </Button>
      </Flex>
    </Box>
  )
}

export default Navbar
