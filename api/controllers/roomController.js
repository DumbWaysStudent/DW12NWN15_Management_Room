const models = require('../models')
const Room = models.room

exports.index = (req, res) => {
  try {
    Room.findAll().then(rooms => {
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
  const { name } = req.body
  try {
    Room.create({name}).then(() => {
      res.send({
        error: false,
        message: "success to create a room"
      })
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed to crate a room"
      })
    })
  } catch (error) {
    res.send(error)
  }
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    Room.update({name}, {where: {id}, field: ['name']}).then(() => {
      res.send({
        error: false,
        message: "success to edit room"
      })
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed to edit room"
      })
    })
  } catch (error) {
    res.send(error)
  }
}