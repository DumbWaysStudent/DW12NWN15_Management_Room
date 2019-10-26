const express = require('express')
require('express-group-routes')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.json())

// Routes
app.get('/', (req,res) => {
  res.send({
    data: "success"
  })
})

app.listen(port, () => console.log(`listen to port ${port}`))