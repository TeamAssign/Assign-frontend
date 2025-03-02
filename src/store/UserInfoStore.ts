import { UserInfoType } from '@/types'
import { create } from 'zustand'

interface UserStore {
  id: number | null
  name: string
  profileImageUrl: string
  teamId: number | null
  teamName: string
  setUserInfo: (userInfo: UserInfoType) => void
}

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  name: '',
  profileImageUrl: '',
  teamId: null,
  teamName: '',
  setUserInfo: (userInfo) => {
    set(userInfo)
  },
}))
