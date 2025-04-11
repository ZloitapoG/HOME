import { zSignUpTrpcInput } from '@home/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItem'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllTextPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  //const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllTextPageRoute())
        // await signUp.mutateAsync(values)
        //formik.resetForm()
        // setSuccessMessageVisible(true)
        // setTimeout(() => {
        //   setSuccessMessageVisible(false)
        // }, 3000)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="Регистрация">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Никнейм" name="nick" formik={formik} />
          <Input label="Пароль" name="password" type="password" formik={formik} />
          <Input label="Пароль еще раз" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">В некоторых поляк косяк</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Войти</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
