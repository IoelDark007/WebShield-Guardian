import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Global.css'
import WarningPage from './pages/Warning'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WarningPage />
  </StrictMode>,
)
