'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'user_auth',
        'attempt_counter',
        {
          type: Sequelize.BIGINT.UNSIGNED,
          defaultValue: 0,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'user_auth',
        'last_attempt_time',
        {
          type: Sequelize.BIGINT.UNSIGNED,
          defaultValue: 0,
          allowNull: true
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user_auth', 'attempt_counter'),
      queryInterface.removeColumn('user_auth', 'last_attempt_time')
    ]);
  }
};
