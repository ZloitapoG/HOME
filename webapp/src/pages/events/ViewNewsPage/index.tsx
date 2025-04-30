import type { TrpcRouterOutput } from '@home/backend/src/router'
import { canBlockEvent, canEditEvent } from '@home/backend/src/utils/can'
import { format } from 'date-fns/format'
import { Fragment } from 'react/jsx-runtime'
import { useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button, LinkButton } from '../../../components/Button'
import { FormItems } from '../../../components/FormItem'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditTextPageRoute, type ViewNewsRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

const LikeButton = ({ event }: { event: NonNullable<TrpcRouterOutput['getText']['text']> }) => {
  const trpcUtils = trpc.useUtils()
  const setEventLike = trpc.setEventLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetEventData = trpcUtils.getText.getData({ home: event.nick })
      if (oldGetEventData?.text) {
        const newGetEventData = {
          ...oldGetEventData,
          event: {
            ...oldGetEventData.text,
            isLikedByMe,
            likesCount: oldGetEventData.text.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getText.setData({ home: event.nick }, newGetEventData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getText.invalidate({ home: event.nick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setEventLike.mutateAsync({ eventId: event.id, isLikedByMe: !event.isLikedByMe })
      }}
    >
      {event.isLikedByMe ? 'Не одобряю' : 'Одобряю'}
    </button>
  )
}

const BlockEvent = ({ event }: { event: NonNullable<TrpcRouterOutput['getText']['text']> }) => {
  const blockEvent = trpc.blockEvent.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockEvent.mutateAsync({ eventId: event.id })
      await trpcUtils.getText.refetch({ home: event.nick })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  )
}

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
  showLoaderOnFetching: false,
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
    <div className={css.likes}>
      Likes: {event.likesCount}
      {me && (
        <>
          <br />
          <LikeButton event={event} />
        </>
      )}
    </div>
    {canEditEvent(me, event) && (
      <div className={css.editButton}>
        <LinkButton to={getEditTextPageRoute({ home: event.nick })}>Исправить косяк</LinkButton>
      </div>
    )}
    {canBlockEvent(me) && (
      <div className={css.blockEvent}>
        <BlockEvent event={event} />
      </div>
    )}
  </Segment>
))
