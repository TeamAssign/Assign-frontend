import {
  Button,
  FlavorStatItem,
  Input,
  SelectBox,
  TextArea,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const teamList = [
  { teamId: 1, teamName: '팀1' },
  { teamId: 2, teamName: '팀2' },
  { teamId: 3, teamName: '팀3' },
]
// zod 스키마 정의
const welcomeSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  team: z.string().min(1, { message: '팀을 선택해주세요' }),
  flavors: z.object({
    sweet: z.number().min(0).max(5),
    salty: z.number().min(0).max(5),
    spicy: z.number().min(0).max(5),
  }),
  likes: z
    .string()
    .min(15, { message: '15자 이상 입력해주세요' })
    .max(100, { message: '100자 이내로 입력해주세요' }),
  dislikes: z
    .string()
    .min(15, { message: '15자 이상 입력해주세요' })
    .max(100, { message: '100자 이내로 입력해주세요' }),
})
// zod 스키마 타입 추론 - 스키마로부터 타입 생성
type WelcomeFormValues = z.infer<typeof welcomeSchema>

const Welcome = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeFormValues>({
    defaultValues: {
      name: '',
      team: '',
      flavors: {
        sweet: 0,
        spicy: 0,
        salty: 0,
      },
      likes: '',
      dislikes: '',
    },
    resolver: zodResolver(welcomeSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='p-4 bg-orange-50'>
      <h1 className='p-8 text-3xl font-bold text-center text-gray-800'>
        점심 뭐 먹지?
      </h1>
      <form onSubmit={onSubmit}>
        <div className='space-y-8'>
          <div className='p-6 bg-white rounded-lg'>
            <p className='pb-5 text-lg font-medium text-gray-700'>
              이름을 입력해주세요
            </p>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <div className='space-y-2'>
                  <Input {...field} placeholder='홍길동' className='w-full' />
                  {errors.name && (
                    <p className='text-subbody text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className='p-6 bg-white rounded-lg'>
            <p className='pb-5 text-lg font-medium text-gray-700'>
              본인이 속한 팀을 선택해주세요
            </p>
            <Controller
              name='team'
              control={control}
              render={({ field }) => (
                <div className='space-y-2'>
                  <SelectBox
                    placeholder='팀 선택'
                    values={teamList}
                    label='팀'
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                  {errors.team && (
                    <p className='text-subbody text-red-500'>
                      {errors.team.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className='p-6 bg-white rounded-lg'>
            <p className='pb-5 text-lg font-medium text-gray-700'>
              음식 성향에 대해 이야기 해주세요!
            </p>

            <Controller
              name='flavors'
              control={control}
              render={({ field }) => (
                <div className='space-y-6'>
                  <FlavorStatItem
                    defaultValue={field.value.sweet}
                    type='sweet'
                    label='단 맛'
                    onValueChange={(type, value) => {
                      field.onChange({
                        ...field.value,
                        [type]: value,
                      })
                    }}
                  />
                  <FlavorStatItem
                    defaultValue={field.value.salty}
                    type='salty'
                    label='짠 맛'
                    onValueChange={(type, value) => {
                      field.onChange({
                        ...field.value,
                        [type]: value,
                      })
                    }}
                  />
                  <FlavorStatItem
                    defaultValue={field.value.spicy}
                    type='spicy'
                    label='매운 맛'
                    onValueChange={(type, value) => {
                      field.onChange({
                        ...field.value,
                        [type]: value,
                      })
                    }}
                  />
                </div>
              )}
            />
          </div>

          <div className='p-6 bg-white rounded-lg'>
            <p className='pb-5 text-lg font-medium text-gray-700'>
              추가적인 음식 성향을 이야기 해주세요!
            </p>

            <div className='space-y-6'>
              <div>
                <p className='pb-2 font-medium text-gray-600 text-md'>
                  이 점은 좋아요
                </p>
                <Controller
                  name='likes'
                  control={control}
                  render={({ field }) => {
                    const currentLength = field.value.length
                    return (
                      <div className='space-y-2'>
                        <TextArea {...field} className='w-full' />
                        <div className='flex justify-between'>
                          {errors.likes && (
                            <p className='text-subbody text-red-500'>
                              {errors.likes.message}
                            </p>
                          )}
                          <span className={`text-subbody`}>
                            {currentLength}/100자
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              </div>
              <div>
                <p className='pb-2 font-medium text-gray-600 text-md'>
                  이 점은 싫어요
                </p>
                <Controller
                  name='dislikes'
                  control={control}
                  render={({ field }) => {
                    const currentLength = field.value.length
                    return (
                      <div className='space-y-2'>
                        <TextArea {...field} className='w-full' />
                        <div className='flex justify-between'>
                          {errors.dislikes && (
                            <p className='text-subbody text-red-500'>
                              {errors.dislikes.message}
                            </p>
                          )}
                          <span className={`text-subbody`}>
                            {currentLength}/100자
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center w-full py-8'>
          <Button type='submit' className='w-full'>
            제출하기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Welcome
