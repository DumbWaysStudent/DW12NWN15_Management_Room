'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        name: "Aria Delta",
        identity_number: "0000567487665784",
        phone: "089275643324",
        image: ""
      },
      {
        name: "Scott Einhar",
        identity_number: "0018765664789023",
        phone: "087276542354",
        image: ""
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
