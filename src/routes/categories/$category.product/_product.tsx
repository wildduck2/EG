import { Footer, Header } from '@/components/layouts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/$category/product/_product')({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
})
