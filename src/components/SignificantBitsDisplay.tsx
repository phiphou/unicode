import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { extractSignificantBitsWithIndex, getSignificantBitColor, type BitDisplay, type Utf8Info } from '@/lib/utf8Utils'
import { useTranslation } from 'react-i18next'

interface SignificantBitsDisplayProps {
  significantBits: string
  significantDecimal: number
  significantHex: string
  utf8Info: Utf8Info
  bitDisplay: BitDisplay[][]
}

export default function SignificantBitsDisplay({
  significantBits,
  significantDecimal,
  significantHex,
  utf8Info,
  bitDisplay
}: SignificantBitsDisplayProps) {
  const { t } = useTranslation()
  const significantBitsWithIndex = extractSignificantBitsWithIndex(bitDisplay)

  return (
    <Card className="bg-muted/50  py-3 sm:py-3 gap-1 ">
      <CardHeader className="px-3 sm:px-6 py-0 sm:py-0">
        <CardTitle className="text-xl">{t('significantBitsDisplay.title')}</CardTitle>
        <CardDescription>{t('significantBitsDisplay.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4.5">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground mt-3">{t('significantBitsDisplay.binary')}</div>
          <div className="flex gap-2.5 sm:gap-3 flex-wrap">
            {significantBitsWithIndex.map((bit, index) => (
              <div
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded font-mono font-bold text-lg ${getSignificantBitColor(bit.byteIndex || 0)}`}
              >
                {bit.bit}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{t('significantBitsDisplay.decimal')}</div>
            <div className="text-3xl font-mono font-bold text-foreground">{significantDecimal}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{t('significantBitsDisplay.hexadecimal')}</div>
            <div className="text-3xl font-mono font-bold text-foreground">0x{significantHex.padStart(Math.ceil(utf8Info.hex.length), '0')}</div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {t('significantBitsDisplay.summary', { count: significantBits.length, codePoint: utf8Info.hex.padStart(4, '0') })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
