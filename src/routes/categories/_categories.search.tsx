import { CategorySearchPage } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/_categories/search')({
  component: () => {
    return (
      <>
        <CategorySearchPage />
      </>
    )
  },
})
