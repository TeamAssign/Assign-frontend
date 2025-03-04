import { setTokenProvider } from '@/apis/interceptors'
import useGetTeam from '@/hooks/apis/team/useGetTeam'
import useGetUserInfo from '@/hooks/apis/user/useGetUserInfo'
import { Routes } from '@/routes'
import { useTeamStore } from '@/store/TeamStore'
import { useUserStore } from '@/store/UserInfoStore'
import '@/styles/global.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const App = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { data: teamData, status: teamStatus } = useGetTeam()
  const { data: myInfoData, status: myInfoStatus } = useGetUserInfo()
  const setUserInfo = useUserStore((state) => state.setUserInfo)
  const setTeams = useTeamStore((state) => state.setTeams)

  useEffect(() => {
    setTokenProvider(() => getAccessTokenSilently())
  }, [getAccessTokenSilently])

  useEffect(() => {
    if (teamData && teamStatus === 'success') {
      setTeams(teamData)
    }
    if (myInfoData && myInfoStatus === 'success') {
      setUserInfo(myInfoData)
    }
  }, [myInfoData, setTeams, myInfoStatus, setUserInfo, teamData, teamStatus])

  return <Routes />
}

export default App
