import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Utf8Info } from '@/lib/utf8Utils'
import { useTranslation } from 'react-i18next'

interface UnicodeInfoProps {
  utf8Info: Utf8Info
}

export default function UnicodeInfo({ utf8Info }: UnicodeInfoProps) {
  const { t } = useTranslation()

  return (
    <Card className="bg-muted/50 py-4">
      <CardHeader>
        <CardTitle className="text-xl">{t('unicodeInfo.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-0">
            <div className="text-sm text-muted-foreground">{t('unicodeInfo.decimal')}</div>
            <div className="text-3xl font-mono font-bold">{utf8Info.decimal}</div>
          </div>
          <div className="space-y-0">
            <div className="text-sm text-muted-foreground">{t('unicodeInfo.hexadecimal')}</div>
            <div className="text-3xl font-mono font-bold">U+{utf8Info.hex.padStart(4, '0')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
