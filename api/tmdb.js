import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000
const API_KEY = '9c23e62e90b5e025a3861d71398e5e40'
const API_URL = 'https://api.themoviedb.org/3'

app.get('/api/discover/movie', async (req, res) => {
  try {
    const queryParams = new URLSearchParams(req.query)
    queryParams.set('api_key', API_KEY)

    const response = await fetch(
      `${API_URL}/discover/movie?${queryParams.toString()}`,
    )
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Error fetching from TMDB' })
    }
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`)
})
