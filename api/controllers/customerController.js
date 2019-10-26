const models = require('../models')
const Customer = models.customer

exports.index = (req, res) => {
  try {
    Customer.findAll().then(rooms => {
      res.send(rooms)
    }).catch(() => {
      res.send({
        message: "Gajelas anyink"
      })
    })
  } catch (error) {
    res.send(error)
  }
}

exports.store = (req, res) => {
  const { name, identity_number, phone, image } = req.body
  try {
    Customer.create({name, identity_number, phone, image}).then(() => {
      res.send({
        error: false,
        message: "success to create customer"
      })
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed to create customer"
      })
    })
  } catch (error) {
    res.send(error)
  }
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name, identity_number, phone, image } = req.body
  try {
    Customer.update({ name, identity_number, phone, image}, {where: {id}, field: ['name', 'identity_number', 'phone', 'image']}).then(() => {
      res.send({
        error: false,
        message: "success to edit customer data"
      })
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed to edit customer data"
      })
    })
  } catch (error) {
    res.send(error)
  }
}