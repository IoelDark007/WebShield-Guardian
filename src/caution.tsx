import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Global.css'
import CautionPage from './pages/Caution'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CautionPage />
  </StrictMode>,
)
