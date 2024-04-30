'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'user' })
      User.hasMany(models.SavePost, { foreignKey: 'userId', as: 'savedPost' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    zalo: DataTypes.STRING,
    avatar: DataTypes.BLOB,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};