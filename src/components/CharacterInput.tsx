import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

interface CharacterInputProps {
  value: string
  onChange: (value: string) => void
}

export default function CharacterInput({ value, onChange }: CharacterInputProps) {
  const { t } = useTranslation()

  return (
    <Card className="bg-muted/50  py-3 sm:py-3 gap-1 ">
      <CardContent className="px-3 sm:px-6 py-0 sm:py-0 ">
        <div className="space-y-3">
          <Label htmlFor="char-input" className="text-xl">
            {t('characterInput.title')}
          </Label>
          <Input
            id="char-input"
            type="text"
            value={value}
            onChange={(e) => {
              const firstChar = Array.from(e.target.value)[0] || ''
              onChange(firstChar)
            }}
            placeholder={t('characterInput.placeholder')}
            className="text-3xl sm:text-4xl h-20 text-center"
            maxLength={10}
          />
        </div>
      </CardContent>
    </Card>
  )
}
