import { Link, Outlet } from 'react-router-dom'
import { getAllTextPageRoute, getNewTextRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
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
          <li className={css.item}>
            <Link className={css.link} to={getNewTextRoute()}>
              Add Event!
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
