import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const FrenchFlag = () => (
  <svg className="w-5! h-4.5! sm:w-6.5! sm:h-5!" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="600" fill="#ED2939" />
    <rect width="600" height="600" fill="#fff" />
    <rect width="300" height="600" fill="#002395" />
  </svg>
)

const EnglishFlag = () => (
  <svg className="w-5! h-4.5! sm:w-6.5! sm:h-5!" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="s">
      <path d="M0,0 v40 h60 v-40 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,20 h30 v20 z v-20 h-30 z h-30 v20 z v-20 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v40 h60 v-40 z" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" clipPath="url(#t)" stroke="#C8102E" strokeWidth="5.3" />
      <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13.3" />
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
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
    <Button
      variant="ghost"
      className="w-5 sm:w-7"
      onClick={toggleLanguage}
      title={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {i18n.language === 'fr' ? <FrenchFlag /> : <EnglishFlag />}
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
