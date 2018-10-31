'use strict';

module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'question',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  Question.associate = function (models) {
    models.Question.hasMany(models.Answer, { foreignKey: { allowNull: false } });
  };

  return Question;
};
