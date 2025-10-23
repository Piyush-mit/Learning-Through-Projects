import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <Toaster/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
