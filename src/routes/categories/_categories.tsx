import { Footer, Header } from '@/components/layouts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/_categories')({
  component: () => (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
})
