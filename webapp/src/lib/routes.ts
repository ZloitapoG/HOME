const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}
export const getAllTextPageRoute = () => '/' //главная страница

export const viewNewsRouteParams = getRouteParams({ home: true })
export type ViewNewsRouteParams = typeof viewNewsRouteParams
export const getViewNewsPageRoute = ({ home }: ViewNewsRouteParams) => `/news/${home}`

//export const viewNewsRouteParams = { home: ':home' }
//export type ViewNewsRouteParams = { home: string }
//export const getViewNewsPageRoute = ({ home }: { home: string }) => `/news/${home}`
