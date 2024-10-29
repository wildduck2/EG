import { Categories } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/categories/_categories/$category')({
  component: () => <Categories />,
})
