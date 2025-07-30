"use client"

import { useToast } from "@chakra-ui/react"
import { toaster } from "@/shared/components/ui/toaster"

export function useCustomToast() {
  const toast = useToast()

  const showSuccess = (message: string) => {
    toast({
      title: "成功",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const showError = (message: string) => {
    toast({
      title: "エラー",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  }

  const showInfo = (message: string) => {
    toast({
      title: "情報",
      description: message,
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }

  return {
    showSuccess,
    showError,
    showInfo,
  }
}
