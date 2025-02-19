import { Layout, SimpleLayout } from '@/components'
import History from '@/pages/History'
import Home from '@/pages/Home'
import My from '@/pages/My'
import Recommendation from '@/pages/Recommendation'
import SelectMember from '@/pages/SelectMember'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import Team from '@/pages/Team'
import Welcome from '@/pages/Welcome'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const Routes = () => {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/history', element: <History /> },
      { path: '/my', element: <My /> },
      { path: '/teams/:teamId', element: <Team /> },
      { path: '/recommendation', element: <Recommendation /> },
      { path: '/selectmember', element: <SelectMember /> },
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/welcome', element: <Welcome /> },
    ],
  },
])
