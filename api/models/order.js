'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.customer,{
      foreignKey: 'id'
    })
    order.belongsTo(models.room,{
      foreignKey: 'id'
    })
  };
  return order;
};