import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/nunito'
import '@fontsource/unbounded/500.css'
import '@fontsource/unbounded/700.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/learning.css'
import { App } from './App'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
