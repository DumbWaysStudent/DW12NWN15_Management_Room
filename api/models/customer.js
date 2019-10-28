'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
    customer.hasMany(models.order, {
      foreignKey: 'id'
    })
  };
  return customer;
};