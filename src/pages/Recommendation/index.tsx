import {
  Button,
  Loader,
  MenuRecommendation,
  StoreRecommendation,
} from '@/components'
import useGetRecommendationMenu from '@/hooks/apis/recommendation/useGetRecommendationMenu'
import useGetRecommendationStore from '@/hooks/apis/recommendation/useGetRecommendationStore'
import usePostAcceptMenu from '@/hooks/apis/recommendation/usePostAcceptMenu'
import { Participant } from '@/types'
import { useLocation } from 'react-router-dom'

const Recommendation = () => {
  const location = useLocation()
  const state = location.state || {}
  const participantIds = state.members.map(
    (participant: Participant) => participant.id,
  )

  const {
    data: recommendationMenu,
    status: recommendationStatus,
    refetch: refetchMenuRecommendation,
  } = useGetRecommendationMenu(state.eatType, state.category, participantIds)

  const menuName = recommendationMenu?.name || null

  const {
    data: recommendationStore,
    status: storeRecommendationStatus,
    refetch: refetchStoreRecommendation,
  } = useGetRecommendationStore(menuName)

  const acceptData = {
    ...recommendationMenu,
    type: state.eatType,
    participantIds: state.eatType === '그룹' ? participantIds : [],
  }

  const { mutate: acceptRecommendation } = usePostAcceptMenu(acceptData)

  const isLoading =
    recommendationStatus === 'pending' ||
    storeRecommendationStatus === 'pending'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  const handleRetryClick = async () => {
    try {
      await Promise.all([
        refetchMenuRecommendation(),
        refetchStoreRecommendation(),
      ])
    } catch (error) {
      console.error(
        '추천 데이터를 다시 가져오는 중 오류가 발생했습니다:',
        error,
      )
    }
  }

  const handleAcceptClick = () => {
    acceptRecommendation(acceptData)
  }

  return (
    <section className='flex flex-col w-full gap-4'>
      {recommendationMenu && recommendationStore && (
        <>
          <MenuRecommendation
            name={recommendationMenu.name}
            imageUrl={recommendationMenu.imageUrl}
            accuracy={recommendationMenu.accuracy}
          />

          <StoreRecommendation
            menu={recommendationMenu.name}
            data={recommendationStore}
          />
          <Button size='sm' variant='sub' onClick={handleRetryClick}>
            다시 추천 받기
          </Button>
          <Button size='sm' onClick={handleAcceptClick}>
            추천 수락하기
          </Button>
        </>
      )}
    </section>
  )
}

export default Recommendation
