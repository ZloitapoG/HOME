import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllTextPageRoute, getViewNewsPageRoute, viewNewsRouteParams } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllTextPage } from './pages/AllTextPage'
import { ViewNewsPage } from './pages/ViewNewsPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllTextPageRoute()} element={<AllTextPage />} />
          <Route path={getViewNewsPageRoute(viewNewsRouteParams)} element={<ViewNewsPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
