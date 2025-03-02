import { TeamType } from '@/types'
import { create } from 'zustand'

interface TeamStore {
  teams: TeamType[] | []
  setTeams: (teams: TeamType[]) => void
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  setTeams: (teams: TeamType[]) => {
    set({ teams })
  },
}))
