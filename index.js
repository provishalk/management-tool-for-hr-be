const express = require('express')
const app = express()
const port = process.env.PORT || 3006;

app.get('/', (req, res) => {
  res.send('Welcome to ProjectHR');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})