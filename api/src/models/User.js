const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },{timestamps: false})
}
