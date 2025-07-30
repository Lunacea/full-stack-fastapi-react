import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"
import Navbar from "@/shared/components/Common/Navbar"

export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
