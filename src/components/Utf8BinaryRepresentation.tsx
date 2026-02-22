import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getBitColor, getSignificantBitColor, type BitDisplay, type Utf8Info } from '@/lib/utf8Utils'
import { useTranslation } from 'react-i18next'

interface Utf8BinaryRepresentationProps {
  utf8Info: Utf8Info
  bitDisplay: BitDisplay[][]
}

export default function Utf8BinaryRepresentation({ utf8Info, bitDisplay }: Utf8BinaryRepresentationProps) {
  const { t } = useTranslation()

  const getByteLabel = (index: number, total: number): string => {
    if (total === 1) return t('utf8BinaryRepresentation.uniqueByte')
    if (index === 0) return t('utf8BinaryRepresentation.leadByte')
    return t('utf8BinaryRepresentation.continuationByte', { number: index })
  }

  return (
    <Card className="bg-muted/50  py-3 sm:py-3 gap-1 ">
      <CardHeader className="px-3 sm:px-6 py-0 sm:py-0">
        <CardTitle className="text-xl">{t('utf8BinaryRepresentation.title')}</CardTitle>
        <CardDescription>{utf8Info.utf8Bytes.length} {t('utf8BinaryRepresentation.byte', { count: utf8Info.utf8Bytes.length })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 mt-2">
        {bitDisplay.map((byteBits, byteIndex) => (
          <div key={byteIndex} className="space-y-3 mb-5 mt-0">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{getByteLabel(byteIndex, utf8Info.byteCount)}</div>
              <div className="text-sm text-muted-foreground font-mono">
                0x{utf8Info.utf8Bytes[byteIndex].toString(16).toUpperCase().padStart(2, '0')}
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {byteBits.map((bit, bitIndex) => (
                <div
                  key={bitIndex}
                  className={`w-7 h-7 flex items-center justify-center rounded font-mono font-bold text-lg ${getBitColor(bit.type, bit.byteIndex)}`}
                >
                  {bit.bit}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-3.5">
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-800 rounded"></div>
              <span className="text-sm">{t('utf8BinaryRepresentation.legend.headerBits')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">{t('utf8BinaryRepresentation.legend.continuationBits')}</span>
            </div>
            {utf8Info.byteCount >= 1 && (
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getSignificantBitColor(0).replace('text-white', '')}`}></div>
                <span className="text-sm">{t('utf8BinaryRepresentation.legend.significantBitsByte', { number: 1 })}</span>
              </div>
            )}
            {utf8Info.byteCount >= 2 && (
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getSignificantBitColor(1).replace('text-white', '')}`}></div>
                <span className="text-sm">{t('utf8BinaryRepresentation.legend.significantBitsByte', { number: 2 })}</span>
              </div>
            )}
            {utf8Info.byteCount >= 3 && (
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getSignificantBitColor(2).replace('text-white', '')}`}></div>
                <span className="text-sm">{t('utf8BinaryRepresentation.legend.significantBitsByte', { number: 3 })}</span>
              </div>
            )}
            {utf8Info.byteCount >= 4 && (
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getSignificantBitColor(3).replace('text-white', '')}`}></div>
                <span className="text-sm">{t('utf8BinaryRepresentation.legend.significantBitsByte', { number: 4 })}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
