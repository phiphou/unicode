import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

function getInitialTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (savedTheme) return savedTheme

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const initialTheme = getInitialTheme()
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
    return initialTheme
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Button variant="ghost" size="icon-lg" onClick={toggleTheme} className="text-amber-400 rounded-full w-5 sm:w-7" aria-label="Toggle theme">
      {theme === 'light' ? (
        <Moon className="h-4! w-4! sm:h-5! sm:w-5!" strokeWidth={3} />
      ) : (
        <Sun className="h-4! w-4! sm:h-4.5! sm:w-4.5!" strokeWidth={2.5} />
      )}
    </Button>
  )
}
