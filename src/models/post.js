'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
            Post.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' });
        }
    }
    Post.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.TEXT,
        target: DataTypes.STRING,
        images: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        area: DataTypes.FLOAT,
        provinceId: DataTypes.INTEGER,
        districtId: DataTypes.INTEGER,
        wardId: DataTypes.INTEGER,
        created: DataTypes.DATE,
        expired: DataTypes.DATE,
        statusId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};