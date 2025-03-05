import { getTeamReviews } from '@/apis/feed/getTeamReviews'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetTeamReviews = (id: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['reviews', id],
      queryFn: ({ pageParam }) => getTeamReviews({ pageParam }, id),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.hasNextPage
          ? lastPage.pageInfo.currentPage + 1
          : undefined
      },
    })
  const ref = useIntersectionObserver(
    (entry, observer) => {
      observer.unobserve(entry.target)
      if (hasNextPage && !isFetchingNextPage) {
        setTimeout(() => fetchNextPage(), 700)
      }
    },
    { threshold: 1.0 },
  )

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    ref,
  }
}

export default useGetTeamReviews
