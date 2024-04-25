'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            address: {
                type: Sequelize.STRING
            },
            images: {
                type: Sequelize.TEXT
            },
            area: {
                type: Sequelize.FLOAT
            },
            price: {
                type: Sequelize.FLOAT
            },
            target: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.INTEGER
            },
            districtId: {
                type: Sequelize.INTEGER
            },
            wardId: {
                type: Sequelize.INTEGER
            },
            created: {
                type: Sequelize.DATE
            },
            expired: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('Posts');
    }
};