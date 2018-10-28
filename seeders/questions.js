'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('question', [{
      id: 1,
      question: 'What is your last name?',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      question: 'What is your first name?',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 3,
      question: 'How old are you?',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 4,
      question: 'Which social network do you use? ',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      question: 'What is better facebook or instagram and why?',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('question', null, {});
  }
};
