const express = require('express')
require('dotenv').config({ path: '.env.local' })

const getPopular = require('../api/getPopular')
const search = require('../api/search')
const video = require('../api/video')

const app = express()
const port = '8081'

app.use(express.json())

app.use('/api/getPopular', getPopular)
app.use('/api/search', search)
app.use('/api/video', video)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
