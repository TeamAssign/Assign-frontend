import { Button, Input, RadioGroups, TextArea } from '@/components'
import { useForm } from 'react-hook-form'

interface ReviewFormProps {
  type?: string
  recommendationId?: number
  menu?: string
  participants?: {
    id: number
    name: string
    team: string
    profileImage: string
  }[]
}

const ReviewForm = ({
  recommendationId,
  type,
  menu,
  participants,
}: ReviewFormProps) => {
  console.log(recommendationId, menu, participants)
  const { register, handleSubmit, setValue } = useForm()

  const handleClickSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <section className='w-full p-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(handleClickSubmit)}
      >
        <h1>식사 유형</h1>
        <RadioGroups defaultType={type} />
        <h1>후기 사진</h1>
        <div className='relative'>
          <img className='object-cover w-24 h-24 rounded-md border-[1px] border-light-gray' />
          <button>사진 등록하기</button>
        </div>
        <h1>메뉴 명</h1>
        <Input {...register('menu')} placeholder='메뉴 명을 입력해주세요.' />
        <h1>후기</h1>
        <TextArea
          {...register('comment')}
          placeholder='후기를 등록 입력해주세요.'
        />
        <h1>별점</h1>
        <Button type='submit'>후기 작성 완료</Button>
      </form>
    </section>
  )
}

export default ReviewForm
