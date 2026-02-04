import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

interface BinaryToDecimalConversionProps {
  significantBits: string
  significantDecimal: number
}

export default function BinaryToDecimalConversion({ significantBits, significantDecimal }: BinaryToDecimalConversionProps) {
  const { t } = useTranslation()

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-xl">{t('binaryToDecimalConversion.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="font-medium">{t('binaryToDecimalConversion.explanation')}</div>
        <div className="overflow-x-auto">
          <div className="inline-flex gap-2">
            {significantBits
              .split('')
              .reverse()
              .map((bit, index) => {
                const power = index
                const value = parseInt(bit) * Math.pow(2, power)
                const isZero = parseInt(bit) === 0
                return (
                  <div key={index} className={`flex flex-col items-center gap-5 text-md font-mono min-w-9 min-h-9 ${isZero ? 'opacity-50' : ''}`}>
                    <span className={`${isZero ? 'bg-gray-400' : 'bg-green-600'} text-white px-3 py-1  rounded font-bold`}>{bit}</span>
                    <span className="text-muted-foreground">×</span>
                    <span className={isZero ? 'text-muted-foreground' : 'font-bold'}>
                      2<sup>{power}</sup>
                    </span>
                    <span className={isZero ? 'text-muted-foreground' : 'font-bold'}>{value}</span>
                  </div>
                )
              })
              .reverse()}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-8 pb-2 border-t font-mono font-bold text-xl">
          <span>{t('binaryToDecimalConversion.result')} :</span>
          <span className="text-green-600 dark:text-green-600">
            {significantBits
              .split('')
              .reverse()
              .map((bit, index) => {
                const value = parseInt(bit) * Math.pow(2, index)
                return value > 0 ? value : null
              })
              .filter((v) => v !== null)
              .join(' + ')}{' '}
            = {significantDecimal}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
