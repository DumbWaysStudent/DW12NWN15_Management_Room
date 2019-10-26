const express = require('express')
require('express-group-routes')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.json())

// Controllers
const AuthController = require('./controllers/authController')
const RoomController = require('./controllers/roomController')
const CustomerController = require('./controllers/customerController')
const CheckinController = require('./controllers/checkinController')

// Middlewares
const { authorized} = require('./middleware/main')

// Routes
app.group('/api/v1', router => {
  // Auth API
  router.post('/login', AuthController.store)

  // Room API
  router.get('/rooms', authorized, RoomController.index)
  // req -> name
  router.post('/room', authorized, RoomController.store)
  router.put('/room/:id', authorized, RoomController.update)

  // Todo: Create Customer API
  router.get('/customers', authorized, CustomerController.index)
  // req -> name, identity_number, phone, image
  router.post('/customer', authorized, CustomerController.store)
  router.put('/customer/:id', authorized, CustomerController.update)

  // Todo: Create Checkin API
  router.get('/checkin', authorized, CheckinController.index)
  // req -> room_id, customer_id, duration
  router.post('/checkin', authorized, CheckinController.store)

  // Todo: Create Checkout API
  router.put('/order/:id', authorized, CheckinController.update)

})

app.listen(port, () => console.log(`listen to port ${port}`))