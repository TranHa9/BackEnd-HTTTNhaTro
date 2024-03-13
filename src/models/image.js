'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
        }
    }
    Image.init({
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};