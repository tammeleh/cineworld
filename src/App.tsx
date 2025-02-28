import { Routes, Route } from 'react-router-dom'

import MovieDetails from './pages/MovieDetails'
import MovieList from './pages/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-with-px flex-grow py-8 md:py-12">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<MovieList />} path="/movies" />
          <Route element={<MovieDetails />} path="/movies/:id" />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
