'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SavePost extends Model {
        static associate(models) {
            SavePost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            SavePost.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
        }
    }
    SavePost.init({
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'SavePost',
    });
    return SavePost;
};