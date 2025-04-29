import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyleProvider } from '@ant-design/cssinjs'
import '@ant-design/v5-patch-for-react-19'

//* translations
import csLanguage from './translations/cs.json'
import enLanguage from './translations/en.json'

import App from './App.tsx'
import './index.css'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    load: 'languageOnly',
    fallbackLng: 'cs',
    supportedLngs: ['en', 'cs'],
    resources: {
      en: {
        translation: enLanguage,
      },
      cs: {
        translation: csLanguage,
      },
    },
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <App />
    </StyleProvider>
  </StrictMode>,
)
