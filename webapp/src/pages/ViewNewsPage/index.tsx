import { format } from 'date-fns/format'
import { Fragment } from 'react/jsx-runtime'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditTextPageRoute, type ViewNewsRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewNewsPage = () => {
  const { home } = useParams() as ViewNewsRouteParams

  const getTextResult = trpc.getText.useQuery({
    home,
  })
  const getMeResult = trpc.getMe.useQuery(undefined, {
    refetchOnMount: false,
  })
  if (getTextResult.isLoading || getTextResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getTextResult.isError) {
    return <span>Error: {getTextResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getTextResult.data.text) {
    return <span>Idea not found</span>
  }

  const event = getTextResult.data.text
  const me = getMeResult.data.me

  return (
    <Segment title={event.name} description={event.description}>
      <div className={css.createdAt}>Зделано: {format(event.createAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Аффтор: {event.author.nick}</div>
      <div className={css.text}>
        {event?.text?.split('\n').map((line, i, lines) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </div>
      {me?.id === event.authorID && (
        <div className={css.editButton}>
          <LinkButton to={getEditTextPageRoute({ home: event.nick })}>Исправить косяк</LinkButton>
        </div>
      )}
    </Segment>
  )
}
