export const App = () => {
  const news = [
    { nick: 'build news 1', name: 'Новость 1', description: 'Описание 1' },
    { nick: 'build news 2', name: 'Новость 2', description: 'Описание 2' },
    { nick: 'build news 3', name: 'Новость 3', description: 'Описание 3' },
    { nick: 'build news 4', name: 'Новость 4', description: 'Описание 4' },
    { nick: 'build news 5', name: 'Новость 5', description: 'Описание 5' },
  ]
  return (
    <div>
      <h1>Home, sweet home!</h1>
      {news.map((text) => {
        return (
          <div key={text.nick}>
            <h2>{text.name}</h2>
            <p>{text.description}</p>
          </div>
        )
      })}
    </div>
  )
}
