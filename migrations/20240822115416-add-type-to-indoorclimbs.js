'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('IndoorClimbs', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'indoor'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('IndoorClimbs', 'type');
  }
};
