import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { AllTextPage } from './pages/events/AllTextPage'
import { EditTextPage } from './pages/events/EditTextPage'
import { NewTextPage } from './pages/events/NewTextPage'
import { ViewNewsPage } from './pages/events/ViewNewsPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
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
              <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
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
