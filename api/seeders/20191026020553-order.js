'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        room_id: 1,
        customer_id: 1,
        is_done: false,
        is_booked: true,
        duration: 10,
        order_end_time: moment(new Date()).add(10, 'm').toDate()
      },
      {
        room_id: 2,
        customer_id: 2,
        is_done: false,
        is_booked: true,
        duration: 10,
        order_end_time: moment(new Date()).add(10, 'm').toDate()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {});
  }
};
