import { Routes, Route } from 'react-router-dom'

import MovieDetails from './pages/MovieDetails'
import MovieList from './pages/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-with-px flex-grow py-8 md:py-12">
        <Routes>
          <Route element={<MovieList />} path="/" />
          <Route element={<MovieDetails />} path="/movie/:id" />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
