import { ErrorPageComponent } from '../../../components/ErrorPageComponent'

export const NotFoundPage = ({
  title = 'Балалайка',
  message = 'Извините, но такого у нас нет....',
}: {
  title?: string
  message?: string
}) => <ErrorPageComponent title={title} message={message} />
