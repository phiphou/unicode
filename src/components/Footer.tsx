export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full  bg-background mt-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-0">
          <div className="text-sm text-muted-foreground mx-auto">© {currentYear} UTF-8 Visualizer. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
