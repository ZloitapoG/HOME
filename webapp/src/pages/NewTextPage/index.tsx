import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewTextPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1, 'Заголовок пустой! :Р'),
        nick: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/, 'Тут можно только маленькие буквы, числа и дефисы'),
        description: z.string().min(1, 'Описание пустое!  :Р'),
        text: z.string().min(100, 'Текст не может быть меньше 100 буковок :Р'),
      })
    ),
    onSubmit: (values) => {
      console.info('Засубмичено', values)
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
