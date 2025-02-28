import { setAuth0Token } from '@/apis/auth0Instance'
import useGetToken from '@/apis/user/useGetToken'
import { patchIsFirstLogin } from '@/apis/user/usePatchIsFirstLogin'
import usePostUser from '@/apis/user/usePostUser'
import {
  Button,
  FlavorStatItem,
  Input,
  SelectBox,
  TextArea,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { jwtDecode } from 'jwt-decode'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const teamList = [
  { teamId: 1, teamName: '팀1' },
  { teamId: 2, teamName: '팀2' },
  { teamId: 3, teamName: '팀3' },
]
// zod 스키마 정의
const welcomeSchema = z.object({
  userName: z.string().min(1, { message: '이름을 입력해주세요' }),
  teamName: z.string().min(1, { message: '팀을 선택해주세요' }),

  sweet: z.number().min(0).max(5),
  salty: z.number().min(0).max(5),
  spicy: z.number().min(0).max(5),

  pros: z
    .string()
    .min(15, { message: '15자 이상 입력해주세요' })
    .max(100, { message: '100자 이내로 입력해주세요' }),
  cons: z
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
      userName: '',
      teamName: '',
      sweet: 0,
      spicy: 0,
      salty: 0,
      pros: '',
      cons: '',
    },
    resolver: zodResolver(welcomeSchema),
  })

  const postUser = usePostUser()
  const { data: tokenData } = useGetToken()

  const onSubmit = handleSubmit((data) => {
    console.log('Form data:', data)
    try {
      postUser.mutate(data, {
        onSuccess: async () => {
          if (tokenData) {
            try {
              console.log('토큰 데이터:', tokenData)
              const decodedToken = jwtDecode(tokenData)
              if (!decodedToken.sub) {
                throw new Error('토큰에 사용자 ID가 없습니다')
              }
              const userId = decodedToken.sub
              setAuth0Token(tokenData)
              await patchIsFirstLogin(userId)
              alert('성공적으로 제출되었습니다.')
            } catch (error) {
              console.error('토큰 처리 중 오류:', error)
              alert('사용자 정보 업데이트 중 오류가 발생했습니다.')
            }
          } else {
            console.error('토큰이 없습니다')
            alert('인증 정보를 가져올 수 없습니다.')
          }
        },
        onError: () => {
          alert('제출에 실패했습니다.')
        },
      })
    } catch (error) {
      console.error('API 호출 실패:', error)
    }
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
              name='userName'
              control={control}
              render={({ field }) => (
                <div className='space-y-2'>
                  <Input {...field} placeholder='홍길동' className='w-full' />
                  {errors.userName && (
                    <p className='text-red-500 text-subbody'>
                      {errors.userName.message}
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
              name='teamName'
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
                  {errors.teamName && (
                    <p className='text-red-500 text-subbody'>
                      {errors.teamName.message}
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
            <div className='space-y-6'>
              <Controller
                name='sweet'
                control={control}
                render={({ field }) => (
                  <FlavorStatItem
                    defaultValue={field.value}
                    type='sweet'
                    label='단 맛'
                    onValueChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
              <Controller
                name='salty'
                control={control}
                render={({ field }) => (
                  <FlavorStatItem
                    defaultValue={field.value}
                    type='salty'
                    label='짠 맛'
                    onValueChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
              <Controller
                name='spicy'
                control={control}
                render={({ field }) => (
                  <FlavorStatItem
                    defaultValue={field.value}
                    type='spicy'
                    label='매운 맛'
                    onValueChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </div>
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
                  name='pros'
                  control={control}
                  render={({ field }) => {
                    const currentLength = field.value.length
                    return (
                      <div className='space-y-2'>
                        <TextArea {...field} className='w-full' />
                        <div className='flex justify-between'>
                          {errors.pros && (
                            <p className='text-red-500 text-subbody'>
                              {errors.pros.message}
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
                  name='cons'
                  control={control}
                  render={({ field }) => {
                    const currentLength = field.value.length
                    return (
                      <div className='space-y-2'>
                        <TextArea {...field} className='w-full' />
                        <div className='flex justify-between'>
                          {errors.cons && (
                            <p className='text-red-500 text-subbody'>
                              {errors.cons.message}
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
