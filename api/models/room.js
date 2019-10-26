'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
    room.belongsToMany(models.customer, {
      through: "orders",
      foreignKey: "room_id"
    }),
    room.hasMany(models.order, {
      foreignKey: "room_id"
    })
  };
  return room;
};