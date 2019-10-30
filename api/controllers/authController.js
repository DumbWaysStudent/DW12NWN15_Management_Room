const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.user

exports.store = (req, res) => {
  const { username, password } = req.body

  try {
    User.findOne({
      attributes: ['name', 'email', 'username', 'photo'],
      where: { username, password }
    }).then( user => {
      const token = jwt.sign({ id: user.username }, 'justdoit', { expiresIn: 604800000000 })
      res.send({
        error: false,
        data: user,
        token
      })
    }).catch(e => {
      res.send({
        error: true,
        message: "wrong username/password!"
      })
    })
  } catch(e) {
    res.send({
      error: true,
      message: e
    })
  }
}