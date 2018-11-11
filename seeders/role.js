'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role', [{
      id: 1,
      role: 'Creator',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      role: 'Admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 3,
      role: 'User',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role', null, {});
  }
};
