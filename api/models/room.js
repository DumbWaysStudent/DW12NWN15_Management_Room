'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
    room.belongsTo(models.customer, {
      through: "orders",
      foreignKey: "id"
    })
    room.hasMany(models.order, {
      foreignKey: 'id'
    })
  };
  return room;
};