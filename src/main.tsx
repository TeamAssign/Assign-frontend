import { Auth0Provider } from '@auth0/auth0-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>,
)
