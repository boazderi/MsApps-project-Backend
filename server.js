const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const picService = require('./services/pic.service')
const app = express()

// Cors Config:
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// Express Routing:

// LIST - get images from picService based on filterBy, using API call and return them to the client
app.get('/api/pic',async (req, res) => {
  const {filterBy, sortBy} = req.query

  try {
    const pics = await picService.query(filterBy, sortBy)
    res.send(pics)
  }
  catch (err) {
    console.error(err)
    res.status(500).send({message: 'Failed to get pics'})
  }
})

app.listen(3030, () =>
  console.log(`Server listening on port http://127.0.0.1:3030/`)
)
