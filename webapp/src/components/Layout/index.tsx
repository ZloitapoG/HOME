import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { getAllTextPageRoute, getNewTextRoute, setSignUpRoute, setSignInRoute, setSignOutRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

  const location = useLocation()

  if (isLoading || isFetching) {
    return <div className={css.layout}>Загрузка...</div>
  }
  if (!data?.me && !['/sign-in', '/sign-up'].includes(location.pathname)) {
    return <Navigate to={setSignInRoute()} replace />
  }
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Home</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllTextPageRoute()}>
              Дом
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : data.me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewTextRoute()}>
                  Добавить событие
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={setSignOutRoute()}>
                  Выходим ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={setSignUpRoute()}>
                  Регистрация
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={setSignInRoute()}>
                  Заходим
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
