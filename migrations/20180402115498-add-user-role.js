'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'user',
        'role_id',
        {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 3,
          references: {
            model: 'role',
            key: 'id'
          }
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user', 'role_id')
    ]);
  }
};
