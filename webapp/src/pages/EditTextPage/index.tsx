import type { TrpcRouterOutput } from '@home/backend/src/router'
import { zUpdateEventTrpcInput } from '@home/backend/src/router/updateEvent/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItem'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { type EditTextRouteParams, getViewNewsPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditEventComponent = ({ event }: { event: NonNullable<TrpcRouterOutput['getText']['text']> }) => {
  const navigate = useNavigate()
  const updateEvent = trpc.updateEvent.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(event, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateEventTrpcInput.omit({ eventId: true }),
    onSubmit: async (values) => {
      await updateEvent.mutateAsync({ eventId: event.id, ...values })
      navigate(getViewNewsPageRoute({ home: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${event.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Поменять событие</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditTextPage = () => {
  const { home } = useParams() as EditTextRouteParams

  const getTextResult = trpc.getText.useQuery({
    home,
  })
  const me = useMe()

  if (getTextResult.isLoading || getTextResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getTextResult.isError) {
    return <span>Error: {getTextResult.error.message}</span>
  }

  if (!getTextResult.data.text) {
    return <span>Idea not found</span>
  }

  const event = getTextResult.data.text

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== event.authorID) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditEventComponent event={event} />
}
