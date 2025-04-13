import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import { LessonProvider } from './context/FlowContext.tsx'
// import './assets/styles.css'
import 'bootstrap';
import '@popperjs/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LessonProvider>
    <ToastProvider>
      <App />
    </ToastProvider>  
      </LessonProvider> 
  </StrictMode>,
)