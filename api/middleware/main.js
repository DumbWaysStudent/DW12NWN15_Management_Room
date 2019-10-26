const jwt = require('express-jwt')

exports.authorized = jwt({secret: 'justdoit'})