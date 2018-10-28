'use strict';

const db = require('../models');

module.exports = {
  getQuestions
};

async function getQuestions () {
  const questions = await db.Question.findOne({
    attributes: ['id', 'question']
  });
  return questions;
}
