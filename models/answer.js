'use strict';

module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    answer: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    question_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'answer',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  Answer.associate = function (models) {
    models.Answer.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.Answer.belongsTo(models.Question, { foreignKey: { allowNull: false } });
  };

  return Answer;
};
