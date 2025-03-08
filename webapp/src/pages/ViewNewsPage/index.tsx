import { useParams } from 'react-router-dom'
import { type ViewNewsRouteParams } from '../../lib/routes'

export const ViewNewsPage = () => {
  const { home } = useParams() as ViewNewsRouteParams
  return (
    <div>
      <h1>{home}</h1>
      <p>Description of news 1...</p>
      <div>
        <p>Text paragrph 1 of news 1...</p>
        <p>Text paragrph 2 of news 2...</p>
        <p>Text paragrph 3 of news 3...</p>
      </div>
    </div>
  )
}
