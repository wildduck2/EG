import { Categories, Home } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/categories/_categories/')({
  component: () => (
    <>
      <Categories />
    </>
  ),
})
