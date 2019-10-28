const models = require('../models')
const Room = models.room
const Customer = models.customer
const Order = models.order
const moment = require('moment')

exports.index = (req, res) => {
  try {
    Room.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Customer
        },
        {
          model: Order,
          required: false,
          where: { 'is_done' : false }
        }
      ],
      order: [
        ['id', 'ASC']
      ],
    }).then(data => {
      res.send(data)
    }).catch(() => {
      res.send({message: "Gajelas anying"})
    })
  } catch (error) {
    res.send(error)
  }
}

exports.store = (req, res) => {
  const { room_id, customer_id, duration } = req.body
  const order_end_time = moment(new Date()).add(duration, 'm').toDate()
  const is_done = false
  const is_booked = true
  
  try {
    Order.create(
      {room_id, customer_id, duration, order_end_time, is_done, is_booked}
    ).then(() => {
      res.send({
        error: false,
        message: "success to create an order!"
      })  
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed when booking!"
      })
    })
  } catch (error) {
    res.send(error)
  }
}

exports.update = (req, res) => {
  const { id } = req.params
  const is_done = true
  const is_booked = false
  
  try {
    Order.update(
      { is_done, is_booked },
      {
        where: {id},
        field: ['is_booked', 'is_done'],
      }
    ).then(() => {
      res.send({
        error: false,
        message: "success to checkout an order!"
      })  
    }).catch(() => {
      res.send({
        error: true,
        message: "Failed when booking!"
      })
    })
  } catch (error) {
    res.send({message: "fail"})
  }
}