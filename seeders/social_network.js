'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('social_network', [{
      id: 0,
      name: 'UNKNOWN',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 1,
      name: 'INSTAGRAM',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      name: 'FACEBOOK',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 3,
      name: 'TWITTER',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 4,
      name: 'LINKEDIN',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('social_network', null, {});
  }
};
