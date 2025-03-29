import { zCreateEventTrpcInput } from '@home/backend/src/router/createEvent/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItem'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewTextPage = () => {
  const [successMassageVisible, setSuccessMassageVisible] = useState(false)
  const [submittingError, setsubmittingError] = useState<string | null>(null)
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
      try {
        await createText.mutateAsync(values)
        formik.resetForm()
        setSuccessMassageVisible(true)
        setTimeout(() => {
          setSuccessMassageVisible(false)
        }, 3000)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setsubmittingError(error.message)
        setTimeout(() => {
          setsubmittingError(null)
        }, 3000)
      }
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
        <FormItems>
          <Input name="name" label="Заголовок" formik={formik} />
          <Input name="nick" label="В области" formik={formik} />
          <Input name="description" label="Кратко о событии" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Ну, рассказывай:" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Где то скрывается косяк о_О</div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMassageVisible && <Alert color="green">Событие опубликовано!</Alert>}
          <Button loading={formik.isSubmitting}>Засубмитить</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
