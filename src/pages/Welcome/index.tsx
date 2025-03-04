import {
  Button,
  FlavorStatItem,
  Input,
  Loader,
  SelectBox,
  TextArea,
} from '@/components'
import useGetToken from '@/hooks/apis/auth/useGetToken'
import useGetTeam from '@/hooks/apis/team/useGetTeam'
import usePostRegisterUser from '@/hooks/apis/user/usePostRegisterUser'
import { WelcomeFormValues, WelcomeSchema } from '@/schemas/welcomeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const Welcome = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeFormValues>({
    defaultValues: {
      name: '',
      teamName: '',
      sweet: 0,
      spicy: 0,
      salty: 0,
      pros: '',
      cons: '',
    },
    resolver: zodResolver(WelcomeSchema),
  })

  const { data: tokenData } = useGetToken()
  const { data: teamData, status: getTeamStatus } = useGetTeam()
  const {
    mutate: registerUser,
    status: postRegisetrsStatus,
    isSuccess,
  } = usePostRegisterUser(tokenData)

  const onSubmit = handleSubmit((data) => {
    if (isSuccess) return
    registerUser(data)
  })

  if (getTeamStatus === 'pending') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )
  }

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
                  <Input
                    {...field}
                    placeholder='이름을 입력해주세요'
                    className='w-full focus:outline-none focus:border-black'
                  />
                  {errors.name && (
                    <p className='text-red-500 text-subbody'>
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
              name='teamName'
              control={control}
              render={({ field }) => (
                <div className='space-y-2'>
                  <SelectBox
                    placeholder='팀 선택'
                    values={teamData}
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
              {errors.sweet && (
                <p className='text-red-500 text-subbody'>
                  {errors.sweet.message}
                </p>
              )}
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
              {errors.salty && (
                <p className='text-red-500 text-subbody'>
                  {errors.salty.message}
                </p>
              )}
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
              {errors.spicy && (
                <p className='text-red-500 text-subbody'>
                  {errors.spicy.message}
                </p>
              )}
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
                        <TextArea
                          {...field}
                          className='w-full focus:outline-none focus:border-black'
                        />
                        <div className='flex justify-between'>
                          {errors.pros && (
                            <p className='text-red-500 text-subbody'>
                              {errors.pros.message}
                            </p>
                          )}
                          <span className='text-subbody text-dark-gray'>
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
                        <TextArea
                          {...field}
                          className='w-full focus:outline-none focus:border-black'
                        />
                        <div className='flex justify-between'>
                          {errors.cons && (
                            <p className='text-red-500 text-subbody'>
                              {errors.cons.message}
                            </p>
                          )}
                          <span className='text-subbody text-dark-gray'>
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
          <Button
            type='submit'
            className='w-full'
            disabled={postRegisetrsStatus === 'pending'}
          >
            {postRegisetrsStatus === 'pending' ? '제출 중...' : '제출하기'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Welcome
