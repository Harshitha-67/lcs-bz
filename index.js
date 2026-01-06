// index.js
import express from 'express'
import { subsetSum } from './sos.js'

const app = express() // ✅ Must define app BEFORE using app.get / app.post

// Middleware to parse JSON
app.use(express.json())

// Home route
app.get('/', (req, res) => {
  res.send('Subset Sum (SOS) API is running')
})

// POST route for SOS
app.post('/sos', (req, res) => {
  const { arr, sum } = req.body

  // Validation
  if (!Array.isArray(arr) || typeof sum !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Provide arr (array) and sum (number)'
    })
  }

  const result = subsetSum(arr, sum)

  res.json({
    array: arr,
    targetSum: sum,
    subsetExists: result
  })
})

// Optional: GET route for SOS using query params
app.get('/sos', (req, res) => {
  const { arr, sum } = req.query

  if (!arr || !sum) {
    return res.status(400).json({
      error: 'Provide arr and sum in query params'
    })
  }

  const array = arr.split(',').map(Number)
  const targetSum = Number(sum)

  const result = subsetSum(array, targetSum)

  res.json({
    array,
    targetSum,
    subsetExists: result
  })
})

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
