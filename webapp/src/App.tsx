import { TrpcProvider } from './lib/trpc'
import { AllTextPage } from './pages/AllTextPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllTextPage />
    </TrpcProvider>
  )
}
