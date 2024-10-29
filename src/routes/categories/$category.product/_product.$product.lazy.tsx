import { ProductPage } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/categories/$category/product/_product/$product',
)({
  component: () => <ProductPage />,
})
