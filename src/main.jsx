import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './app.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import store from './store/store.js'

import "./styles/variables.css"
import "./styles/global.css"
import "./styles/auth.css"
import "./styles/browse.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
