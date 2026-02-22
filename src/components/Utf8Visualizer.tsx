import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { analyzeUtf8Bits, extractSignificantBits, getUtf8Info } from '@/lib/utf8Utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BinaryToDecimalConversion from './BinaryToDecimalConversion'
import CharacterInput from './CharacterInput'
import LanguageToggle from './LanguageToggle'
import SignificantBitsDisplay from './SignificantBitsDisplay'
import ThemeToggle from './ThemeToggle'
import UnicodeInfo from './UnicodeInfo'
import Utf8BinaryRepresentation from './Utf8BinaryRepresentation'

export default function Utf8Visualizer() {
  const { t } = useTranslation()
  const [inputChar, setInputChar] = useState('€')

  // Calculate utf8Info directly during render
  const utf8Info = inputChar ? getUtf8Info(Array.from(inputChar)[0]) : null

  const bitDisplay = utf8Info ? analyzeUtf8Bits(utf8Info.utf8Binary, utf8Info.byteCount) : null
  const significantBits = bitDisplay ? extractSignificantBits(bitDisplay) : ''
  const significantDecimal = significantBits ? parseInt(significantBits, 2) : 0
  const significantHex = significantBits ? significantDecimal.toString(16).toUpperCase() : ''

  return (
    <div className="w-full sm:max-w-5xl lg:max-w-7xl xl:max-w-327 2xl:max-w-400 mx-auto px-6 p-3">
      <Card className="mb-6 py-3 sm:py-2.5  ">
        <CardHeader className="px-3 sm:px-6 py-0 sm:py-0">
          <div className="flex items-start sm:items-center justify-between">
            <div>
              <CardTitle className="text-2xl sm:text-3xl mb-3.5 mt-2">{t('title')}</CardTitle>
              <CardDescription>{t('description')}</CardDescription>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="space-y-6 lg:w-[40%]">
          <CharacterInput value={inputChar} onChange={setInputChar} />

          {utf8Info && bitDisplay && (
            <>
              <UnicodeInfo utf8Info={utf8Info} />
              <Utf8BinaryRepresentation utf8Info={utf8Info} bitDisplay={bitDisplay} />
            </>
          )}
        </div>

        <div className="space-y-6 lg:w-[60%]">
          {utf8Info && bitDisplay && (
            <>
              <SignificantBitsDisplay
                significantBits={significantBits}
                significantDecimal={significantDecimal}
                significantHex={significantHex}
                utf8Info={utf8Info}
                bitDisplay={bitDisplay}
              />
              <BinaryToDecimalConversion significantBits={significantBits} significantDecimal={significantDecimal} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
