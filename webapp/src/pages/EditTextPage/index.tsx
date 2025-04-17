import type { TrpcRouterOutput } from '@home/backend/src/router'
import { zUpdateEventTrpcInput } from '@home/backend/src/router/updateEvent/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import pick from 'lodash/pick'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItem'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type EditTextRouteParams, getViewNewsPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditEventComponent = ({ event }: { event: NonNullable<TrpcRouterOutput['getText']['text']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateEvent = trpc.updateEvent.useMutation()
  const formik = useFormik({
    initialValues: pick(event, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateEventTrpcInput.omit({ eventId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateEvent.mutateAsync({ eventId: event.id, ...values })
        navigate(getViewNewsPageRoute({ home: values.nick }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${event.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
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

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== event.authorID) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditEventComponent event={event} />
}
