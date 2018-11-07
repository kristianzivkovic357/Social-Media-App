'use strict';

module.exports = {
  mapAnswerAndQuestion,
  mapFile
};

function mapAnswerAndQuestion (dataObj) {
  dataObj.forEach(element => {
    delete element.dataValues.id;
    delete element.dataValues.question_id;
    delete element.dataValues.user_id;
    delete element.dataValues.created_at;
    delete element.dataValues.updated_at;
    element.dataValues.question = element.dataValues.Question.question;
    delete element.dataValues.Question;
  });
  return dataObj;
}

function mapFile (dataObj) {
  dataObj.forEach(element => {
    element = element.dataValues.file_id;
  });
  return dataObj;
}
