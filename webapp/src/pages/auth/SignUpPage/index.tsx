import { zSignUpTrpcInput } from '@home/backend/src/router/auth/signUp/input'
import Cookies from 'js-cookie'
import { z } from 'zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItem'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
  title: 'Sign Up',
})(() => {
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
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
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Регистрация">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Никнейм" name="nick" formik={formik} />
          <Input label="Мыло" name="email" formik={formik} />
          <Input label="Пароль" name="password" type="password" formik={formik} />
          <Input label="Пароль еще раз" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Войти</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
