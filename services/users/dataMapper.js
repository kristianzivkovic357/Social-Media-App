'use strict';

module.exports = {
  mapAnswerAndQuestion,
  mapFile,
  mapPosts
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

function mapPosts (dataObj) {
  dataObj.forEach(element => {
    console.log(element);
    delete element.dataValues.id;
    delete element.dataValues.social_network_id;
    delete element.dataValues.user_id;
    delete element.dataValues.updated_at;
    delete element.dataValues.created_at;
    delete element.dataValues.access_token_id;
  });
  return dataObj;
}
