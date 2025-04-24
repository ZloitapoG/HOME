import { format } from 'date-fns/format'
import { Fragment } from 'react/jsx-runtime'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/Segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditTextPageRoute, type ViewNewsRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewNewsPage = withPageWrapper({
  useQuery: () => {
    const { home } = useParams() as ViewNewsRouteParams
    return trpc.getText.useQuery({
      home,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    event: checkExists(queryResult.data.text, 'Таких новостей у нас еще не было'),
    me: ctx.me,
  }),
})(({ event, me }) => (
  <Segment title={event.name} description={event.description}>
    <div className={css.createdAt}>Зделано: {format(event.createAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>
      Аффтор: {event.author.nick} {event.author.name ? ` (${event.author.name})` : '(лосось)'}
    </div>
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
))
