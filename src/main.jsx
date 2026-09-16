import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user" hace que framer-motion respete la preferencia de
        "reducir movimiento" del sistema operativo en toda la aplicacion. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
