import { zUpdateEventTrpcInput } from '@home/backend/src/router/updateEvent/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItem'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { type EditTextRouteParams, getViewNewsPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const EditTextPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { home } = useParams() as EditTextRouteParams
    return trpc.getText.useQuery({ home })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.text,
  checkExistsMessage: 'Новостей нет!',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && ctx.me.id === queryResult.data.text?.authorID,
  checkAccessMessage: 'Эту новость может редактировать только автор!',
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const event = checkExists(queryResult.data.text, 'Событий нет!')
    checkAccess(ctx.me?.id === event.authorID, 'Менять новости могут не только лиш все')
    return {
      event,
    }
  },
})(({ event }) => {
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
})
