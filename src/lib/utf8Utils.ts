export interface Utf8Info {
  char: string
  codePoint: number
  decimal: number
  hex: string
  binary: string
  utf8Bytes: number[]
  utf8Binary: string[]
  byteCount: number
}

export interface BitDisplay {
  bit: string
  type: 'header' | 'continuation' | 'data'
  byteIndex?: number // Index de l'octet d'origine (pour les bits significatifs)
}

export function getUtf8Info(char: string): Utf8Info | null {
  if (!char || char.length === 0) return null

  const codePoint = char.codePointAt(0)
  if (codePoint === undefined) return null

  const encoder = new TextEncoder()
  const utf8Bytes = Array.from(encoder.encode(char))
  const utf8Binary = utf8Bytes.map((byte) => byte.toString(2).padStart(8, '0'))

  return {
    char,
    codePoint,
    decimal: codePoint,
    hex: codePoint.toString(16).toUpperCase(),
    binary: codePoint.toString(2),
    utf8Bytes,
    utf8Binary,
    byteCount: utf8Bytes.length
  }
}

export function analyzeUtf8Bits(utf8Binary: string[], byteCount: number): BitDisplay[][] {
  const result: BitDisplay[][] = []

  for (let i = 0; i < byteCount; i++) {
    const byteBits: BitDisplay[] = []
    const binaryStr = utf8Binary[i]

    if (byteCount === 1) {
      // 1 byte: 0xxxxxxx
      byteBits.push({ bit: binaryStr[0], type: 'header' })
      for (let j = 1; j < 8; j++) {
        byteBits.push({ bit: binaryStr[j], type: 'data', byteIndex: i })
      }
    } else if (i === 0) {
      // First byte: 110xxxxx, 1110xxxx, or 11110xxx
      for (let j = 0; j < byteCount + 1; j++) {
        byteBits.push({ bit: binaryStr[j], type: 'header' })
      }
      for (let j = byteCount + 1; j < 8; j++) {
        byteBits.push({ bit: binaryStr[j], type: 'data', byteIndex: i })
      }
    } else {
      // Continuation bytes: 10xxxxxx
      byteBits.push({ bit: binaryStr[0], type: 'continuation' })
      byteBits.push({ bit: binaryStr[1], type: 'continuation' })
      for (let j = 2; j < 8; j++) {
        byteBits.push({ bit: binaryStr[j], type: 'data', byteIndex: i })
      }
    }

    result.push(byteBits)
  }

  return result
}

export function extractSignificantBits(bitDisplay: BitDisplay[][]): string {
  let significant = ''
  for (const byteBits of bitDisplay) {
    for (const bit of byteBits) {
      if (bit.type === 'data') {
        significant += bit.bit
      }
    }
  }
  return significant
}

export function extractSignificantBitsWithIndex(bitDisplay: BitDisplay[][]): BitDisplay[] {
  const significant: BitDisplay[] = []
  for (const byteBits of bitDisplay) {
    for (const bit of byteBits) {
      if (bit.type === 'data') {
        significant.push(bit)
      }
    }
  }
  return significant
}

export function getSignificantBitColor(byteIndex: number): string {
  const colors = [
    'bg-emerald-700 text-white', // Octet 1
    'bg-cyan-700 text-white', // Octet 2
    'bg-amber-600 text-white', // Octet 3
    'bg-rose-400 text-white' // Octet 4
  ]
  return colors[byteIndex] || 'bg-green-600 text-white'
}

export function getBitColor(type: 'header' | 'continuation' | 'data', byteIndex?: number): string {
  switch (type) {
    case 'header':
      return 'bg-red-800 text-white'
    case 'continuation':
      return 'bg-purple-500 text-white'
    case 'data':
      return byteIndex !== undefined ? getSignificantBitColor(byteIndex) : 'bg-green-600 text-white'
  }
}

export function getByteLabel(index: number, total: number): string {
  if (total === 1) return 'Octet unique'
  if (index === 0) return 'Octet de tête'
  return `Octet de continuation ${index}`
}
