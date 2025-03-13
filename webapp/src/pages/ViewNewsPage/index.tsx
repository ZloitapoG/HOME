import { useParams } from 'react-router-dom'
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
    <div>
      <h1 className={css.title}>{data.text.name}</h1>
      <p className={css.description}>{data.text.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.text.text }} />
    </div>
  )
}
