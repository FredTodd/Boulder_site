'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OutdoorClimbs', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'outdoor',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('OutdoorClimbs', 'type');
  }
};
