import { zGetIdeasTrpcInput } from '@home/backend/src/router/events/getNews/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { getViewNewsPageRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllTextPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })
  const [search] = useDebounceValue(formik.values.search, 500) // 500ms задержка
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getNews.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )
  return (
    <Segment title="Home, sweet home">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Найти" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].events.length ? (
        <Alert color="brown">Ничего не нашел</Alert>
      ) : (
        <div className={css.news}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.events)
              .map((text) => (
                <div className={css.text} key={text.nick}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.textLink} to={getViewNewsPageRoute({ home: text.nick })}>
                        {text.name}
                      </Link>
                    }
                    description={text.description}
                  >
                    Одобрение: {text.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
