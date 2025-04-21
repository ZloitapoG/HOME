import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllTextPage } from './pages/AllTextPage'
import { EditTextPage } from './pages/EditTextPage'
import { NewTextPage } from './pages/NewTextPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewNewsPage } from './pages/ViewNewsPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.setSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.setSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.setSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllTextPageRoute()} element={<AllTextPage />} />
              <Route path={routes.getNewTextRoute()} element={<NewTextPage />} />
              <Route path={routes.getViewNewsPageRoute(routes.viewNewsRouteParams)} element={<ViewNewsPage />} />
              <Route path={routes.getEditTextPageRoute(routes.editTextRouteParams)} element={<EditTextPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
