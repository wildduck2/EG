import { AuthVerificationConfirmedPage } from '@/components/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/_auth/verification-confirmed')({
  component: () => (
    <>
      <AuthVerificationConfirmedPage />
    </>
  ),
})
