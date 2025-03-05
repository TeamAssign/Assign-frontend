import { CardSkeleton, HistoryBar } from '@/components'
import useGetHistories from '@/hooks/apis/recommendation/useGetHistories'
import { HistoryType } from '@/types/DTO'
import React from 'react'

const History = () => {
  const { data, hasNextPage, isFetchingNextPage, ref } = useGetHistories()
  return (
    <section className='w-full'>
      <span className='font-bold text-sub-2 text-title'>
        🍽️ 추천 받았던 메뉴들이에요!
      </span>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.content.map((history: HistoryType) => (
            <HistoryBar
              key={history.recommendationId}
              recommendationId={history.recommendationId}
              imgUrl={history.imageUrl}
              category={history.category}
              type={history.type}
              menu={history.name}
              accuracy={history.accuracy}
              isReviewed={history.reviewed}
              participants={history.participants}
            />
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <div ref={ref}>
          <section className='w-full h-16'>
            {isFetchingNextPage ? <CardSkeleton /> : null}
          </section>
        </div>
      )}
    </section>
  )
}

export default History
