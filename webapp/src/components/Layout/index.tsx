import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import {
  getAllTextPageRoute,
  getNewTextRoute,
  setSignUpRoute,
  setSignInRoute,
  setSignOutRoute,
  getEditProfileRoute,
} from '../../lib/routes'
import css from './index.module.scss'

export const layoutContentElRef = createRef<HTMLDivElement>()
export const Layout = () => {
  const me = useMe()

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
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewTextRoute()}>
                  Добавить событие
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Поправить личку
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={setSignOutRoute()}>
                  Выходим ({me.nick})
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
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
