const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}
export const getAllTextPageRoute = () => '/' //главная страница

export const viewNewsRouteParams = getRouteParams({ home: true })
export type ViewNewsRouteParams = typeof viewNewsRouteParams
export const getViewNewsPageRoute = ({ home }: ViewNewsRouteParams) => `/news/${home}`

export const editTextRouteParams = getRouteParams({ home: true })
export type EditTextRouteParams = typeof viewNewsRouteParams
export const getEditTextPageRoute = ({ home }: EditTextRouteParams) => `/news/${home}/edit`

export const getNewTextRoute = () => '/news/new'
export const getEditProfileRoute = () => '/edit-profile'
export const setSignUpRoute = () => '/sign-up'
export const setSignInRoute = () => '/sign-in'
export const setSignOutRoute = () => '/sign-out'
