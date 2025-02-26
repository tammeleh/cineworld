import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-with-px flex-grow py-8 md:py-12">main</main>
      <Footer />
    </div>
  )
}

export default App
