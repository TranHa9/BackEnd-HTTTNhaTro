'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' })
            Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' })
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
        }
    }
    Post.init({
        title: DataTypes.STRING,
        star: DataTypes.STRING,
        labelCode: DataTypes.STRING,
        address: DataTypes.STRING,
        attributesId: DataTypes.STRING,
        categoryCode: DataTypes.STRING,
        priceCode: DataTypes.STRING,
        provinceCode: DataTypes.STRING,
        areaCode: DataTypes.STRING,
        description: DataTypes.TEXT,
        userId: DataTypes.STRING,
        overviewId: DataTypes.STRING,
        imagesId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};