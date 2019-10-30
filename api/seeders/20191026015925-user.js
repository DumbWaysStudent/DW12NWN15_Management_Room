'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Jill Valentine',
        email: 'valen.jill@racoon.go.us',
        username: 'jill',
        password: '1234',
        photo: 'https://cdn.imgbin.com/21/22/15/imgbin-resident-evil-revelations-resident-evil-5-resident-evil-3-nemesis-jill-valentine-resident-evil-6Rgy43deAhSpJc0hLimaX7ADs.jpg'
      },
      {
        name: 'Elin Swain',
        email: 'swan.elin@we.space',
        username: 'swan',
        password: '1234',
        photo: 'https://cdn.stocksnap.io/img-thumbs/960w/L6YVQ85CKY.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
