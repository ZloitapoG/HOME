import { zCreateEventTrpcInput } from '@home/backend/src/router/createEvent/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewTextPage = () => {
  const createText = trpc.createEvent.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateEventTrpcInput),
    onSubmit: async (values) => {
      await createText.mutateAsync(values)
    },
  })
  return (
    <Segment title="New event">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Заголовок" formik={formik} />
        <Input name="nick" label="В области" formik={formik} />
        <Input name="description" label="Кратко о событии" formik={formik} />
        <Textarea name="text" label="Ну, рассказывай:" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Где то скрывается косяк о_О</div>}
        <button type="submit">Субмитить</button>
      </form>
    </Segment>
  )
}
