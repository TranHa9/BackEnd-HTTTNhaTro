'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Area extends Model {
        static associate(models) {
            // Area.hasMany(models.Post, { foreignKey: 'userId', as: 'user' })
        }
    }
    Area.init({
        code: DataTypes.STRING,
        order: DataTypes.INTEGER,
        value: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Area',
    });
    return Area;
};