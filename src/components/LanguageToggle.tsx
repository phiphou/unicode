import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const FrenchFlag = () => (
  <svg className="w-6.5! h-5! min-w-6.5! min-h-5!" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="600" fill="#ED2939" />
    <rect width="600" height="600" fill="#fff" />
    <rect width="300" height="600" fill="#002395" />
  </svg>
)

const EnglishFlag = () => (
  <svg className="w-6.5! h-5! min-w-6.5! min-h-5!" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
)

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(newLang)
  }

  return (
    <Button variant="ghost" onClick={toggleLanguage} title={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}>
      {i18n.language === 'fr' ? <FrenchFlag /> : <EnglishFlag />}
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
