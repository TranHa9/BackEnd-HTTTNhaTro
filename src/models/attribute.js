'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Attribute extends Model {
        static associate(models) {
        }
    }
    Attribute.init({
        price: DataTypes.STRING,
        acesge: DataTypes.STRING,
        published: DataTypes.STRING,
        hashtag: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Attribute',
    });
    return Attribute;
};