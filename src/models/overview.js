'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Overview extends Model {
        static associate(models) {
        }
    }
    Overview.init({
        code: DataTypes.STRING,
        area: DataTypes.STRING,
        type: DataTypes.STRING,
        bouns: DataTypes.STRING,
        created: DataTypes.DATE,
        expired: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Overview',
    });
    return Overview;
};