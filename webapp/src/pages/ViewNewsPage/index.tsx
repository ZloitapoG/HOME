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
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.text.text }} />
    </Segment>
  )
}
