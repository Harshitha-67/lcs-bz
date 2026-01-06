import express from 'express';
import { subsetSum } from './sos.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello World! SOS API is running.');
});

// About route
app.get('/about', (req, res) => {
  res.send("This is Pravalika's Subset Sum (SOS) API");
});

// GET route using query parameters
// Example: /sos?arr=2,3,7,8,10&sum=11
app.get('/sos', (req, res) => {
  const { arr, sum } = req.query;

  if (!arr || !sum) {
    return res.status(400).send('Please provide both arr and sum query parameters');
  }

  // Convert arr from comma-separated string to number array
  const array = arr.split(',').map(Number);
  const targetSum = Number(sum);

  const result = subsetSum(array, targetSum);

  res.send(`Array: [${array}] <br> Target Sum: ${targetSum} <br> Subset Exists: ${result}`);
});

// POST route using JSON body
// Example body: { "arr": [2,3,7,8,10], "sum": 11 }
app.post('/sos', (req, res) => {
  const { arr, sum } = req.body;

  if (!Array.isArray(arr) || typeof sum !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Provide arr (array) and sum (number)'
    });
  }

  const result = subsetSum(arr, sum);

  res.json({
    array: arr,
    targetSum: sum,
    subsetExists: result
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
