import { format } from 'date-fns/format'
import { Fragment } from 'react/jsx-runtime'
import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewNewsRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewNewsPage = () => {
  const { home } = useParams() as ViewNewsRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getText.useQuery({
    home,
  })
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.text) {
    return <span>Text not found</span>
  }

  return (
    <Segment title={data.text.name} description={data.text.description}>
      <div className={css.createdAt}>Зделано: {format(data.text.createAt, 'yyyy-MM-dd')}</div>
      <div className={css.text}>
        {data.text?.text?.split('\n').map((line, i, lines) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </div>
    </Segment>
  )
}
//<div className={css.text} dangerouslySetInnerHTML={{ __html: data.text.text }} />
