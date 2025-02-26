import { Layout, SimpleLayout } from '@/components'
import History from '@/pages/History'
import Home from '@/pages/Home'
import My from '@/pages/My'
import Recommendation from '@/pages/Recommendation'
import SelectMember from '@/pages/SelectMember'
import SignIn from '@/pages/SignIn'
import Team from '@/pages/Team'
import Welcome from '@/pages/Welcome'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './RedirectRoute'

export const Routes = () => {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to='/' replace />,
      },
      {
        path: '/welcome',
        element: <SimpleLayout />,
        children: [{ index: true, element: <Welcome /> }],
      },
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
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <SimpleLayout />,
        children: [{ path: '/signin', element: <SignIn /> }],
      },
    ],
  },
])
