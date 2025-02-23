import { trpc } from '../../lib/trpc'

export const AllTextPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getNews.useQuery()
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>News feed</h1>
      {data.news.map((text) => {
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
