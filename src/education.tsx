import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Global.css'
import EduPage from './pages/Educational-content'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EduPage />
  </StrictMode>,
)