import Footer from './components/Footer'
import Utf8Visualizer from './components/Utf8Visualizer'

function App() {
  return (
    <div className="min-h-screen bg-background sm:pt-6 pb-1 flex flex-col">
      <div className="flex-1">
        <Utf8Visualizer />
      </div>
      <Footer />
    </div>
  )
}

export default App
