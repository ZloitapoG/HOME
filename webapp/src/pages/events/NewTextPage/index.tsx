import { zCreateEventTrpcInput } from '@home/backend/src/router/events/createEvent/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItem'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewTextPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createText = trpc.createEvent.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateEventTrpcInput,
    onSubmit: async (values) => {
      await createText.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Новость опубликована!',
    showValidationAlert: true,
  })
  return (
    <Segment title="New event">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Заголовок" formik={formik} />
          <Input name="nick" label="В области" formik={formik} />
          <Input name="description" label="Кратко о событии" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Ну, рассказывай:" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Замутить новость</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
