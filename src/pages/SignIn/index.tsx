import { Button } from '@/components'
import { LOGO_IMAGE_URL } from '@/constant'
import { useAuth0 } from '@auth0/auth0-react'

const SignIn = () => {
  const { isLoading, error, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-orange-50'>
        <div className='w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-orange-50'>
        <div className='w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg'>
          <div className='mb-4 text-5xl text-red-500'>😕</div>
          <h2 className='mb-2 font-bold text-gray-800 text-title'>
            로그인 오류
          </h2>
          <p className='mb-4 text-gray-600'>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600'
          >
            다시 시도하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-orange-50'>
      <div className='w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl'>
        <div className='mb-8'>
          <img
            src={LOGO_IMAGE_URL}
            alt='점심 뭐먹지 로고'
            className='mx-auto mb-4 rounded-md w-26 h-26'
          />
          <h1 className='mb-2 text-3xl font-bold text-gray-800'>
            오늘 뭐 먹지?
          </h1>
          <p className='text-gray-600'>오늘의 식사 메뉴를 추천해드립니다</p>
        </div>

        <div className='space-y-4'>
          <Button
            onClick={() => loginWithRedirect()}
            className='w-full px-4 py-3 font-medium text-md'
          >
            로그인하기
          </Button>

          <div className='relative py-2'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center'>
              <span className='px-2 text-gray-500 bg-white text-subbody'>
                또는
              </span>
            </div>
          </div>

          <Button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  screen_hint: 'signup',
                },
              })
            }
            className='w-full px-4 py-3 font-medium text-md'
            variant='sub'
          >
            회원가입
          </Button>
        </div>
      </div>

      <p className='mt-6 text-gray-500 text-subbody'>&copy; 오늘 뭐 먹지?</p>
    </div>
  )
}

export default SignIn
