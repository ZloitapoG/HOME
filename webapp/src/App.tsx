import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllTextPage } from './pages/AllTextPage'
import { NewTextPage } from './pages/NewTextPage'
import { ViewNewsPage } from './pages/ViewNewsPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllTextPageRoute()} element={<AllTextPage />} />
            <Route path={routes.getViewNewsPageRoute(routes.viewNewsRouteParams)} element={<ViewNewsPage />} />
            <Route path={routes.getNewTextRoute()} element={<NewTextPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
