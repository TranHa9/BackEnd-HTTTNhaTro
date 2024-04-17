'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Overview extends Model {
        static associate(models) {
            Overview.hasOne(models.Post, { foreignKey: 'overviewId', as: 'overviews' })
        }
    }
    Overview.init({
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        target: DataTypes.STRING,
        bouns: DataTypes.STRING,
        created: DataTypes.DATE,
        expired: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Overview',
    });
    return Overview;
};