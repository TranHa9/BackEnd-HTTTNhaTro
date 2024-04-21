'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Post, { foreignKey: 'categoryId', as: 'category' })
        }
    }
    Category.init({
        // code: DataTypes.STRING,
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};