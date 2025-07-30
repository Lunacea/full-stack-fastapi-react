import { Outlet, createRootRoute } from "@tanstack/react-router"
import { ChakraProvider } from "@chakra-ui/react"
import NotFound from "@/shared/components/Common/NotFound"
import { system } from "@/theme"

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  return (
    <ChakraProvider value={system}>
      <Outlet />
    </ChakraProvider>
  )
}
