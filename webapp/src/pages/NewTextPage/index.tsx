import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewTextPage = () => {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })

  return (
    <Segment title="New event">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <Input name="name" label="Заголовок" state={state} setState={setState} />
        <Input name="nick" label="В области" state={state} setState={setState} />
        <Input name="description" label="Кратко о событии" state={state} setState={setState} />
        <Textarea name="text" label="Ну, рассказывай:" state={state} setState={setState} />
        <button type="submit">Субмитить</button>
      </form>
    </Segment>
  )
}
