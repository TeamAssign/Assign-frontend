import { patchIsFirstLogin } from '@/apis/auth/patchIsFirstLogin'
import { setAuth0Token } from '@/apis/auth0Instance'
import { postRegisterUser } from '@/apis/user/postRegisterUser'
import { PostUserProps } from '@/types/DTO'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'

const usePostRegisterUser = (tokenData: string) => {
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: (data: PostUserProps) => postRegisterUser(data),
    onSuccess: async () => {
      if (tokenData) {
        try {
          const originalToken = await getAccessTokenSilently()
          const decodedToken = jwtDecode(originalToken)

          if (!decodedToken.sub) {
            throw new Error('토큰에 사용자 ID가 없습니다')
          }

          const userId = decodedToken.sub
          setAuth0Token(tokenData)
          const response = await patchIsFirstLogin(userId)
          if (response && response.status === 200) {
            window.location.reload()
          }
        } catch (error) {
          console.error('사용자 정보 업데이트 중 오류가 발생했습니다.', error)
        }
      } else {
        console.error('토큰이 없습니다')
      }
    },
    onError: (error) => {
      console.error('register error:', error)
    },
  })
}

export default usePostRegisterUser
