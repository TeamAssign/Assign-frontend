import { auth0Instance } from '../auth0Instance'

export const patchIsFirstLogin = async (userId: string) => {
  try {
    const response = await auth0Instance.patch(`/users/${userId}`, {
      user_metadata: {
        first_login: false,
      },
    })
    return response
  } catch (error) {
    console.error('첫 로그인 여부 업데이트 중 오류 발생:', error)
  }
}
