import { Link } from 'react-router-dom'
import { getViewNewsPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllTextPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getNews.useQuery()
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1 className={css.title}>Home, sweet home</h1>
      <div className={css.news}>
        {data.news.map((text) => (
          <div className={css.text} key={text.nick}>
            <h2 className={css.textName}>
              <Link className={css.textLink} to={getViewNewsPageRoute({ home: text.nick })}>
                {text.name}
              </Link>
            </h2>
            <p className={css.textDescription}>{text.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
