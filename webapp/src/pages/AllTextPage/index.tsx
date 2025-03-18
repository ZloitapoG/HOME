import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
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
    <Segment title="Home, sweet home">
      <div className={css.news}>
        {data.news.map((text) => (
          <div className={css.text} key={text.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.textLink} to={getViewNewsPageRoute({ home: text.nick })}>
                  {text.name}
                </Link>
              }
              description={text.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
