'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Overviews', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            target: {
                type: Sequelize.STRING
            },
            bouns: {
                type: Sequelize.STRING
            },
            created: {
                type: Sequelize.DATE
            },
            expired: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Overviews');
    }
};