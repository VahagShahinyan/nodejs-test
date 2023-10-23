'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
    });
    const currentDate = Sequelize.fn('NOW');

    await queryInterface.bulkInsert('users', [
      {
        balance: 10000,
        createdAt: currentDate,
        updatedAt: currentDate,
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
