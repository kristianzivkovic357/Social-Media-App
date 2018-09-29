'use strict';

module.exports = (sequelize, dataTypes) => {
  var UserAuth = sequelize.define('UserAuth', {
    id: {
      type: dataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    hash: {
      type: dataTypes.STRING(512),
      allowNull: false
    },
    attempt_counter: {
      type: dataTypes.BIGINT.UNSIGNED,
      defaultValue: 0,
      allowNull: true
    },
    last_attempt_time: {
      type: dataTypes.BIGINT.UNSIGNED,
      defaultValue: 0,
      allowNull: true
    },
    change_token: {
      type: dataTypes.STRING(64),
      allowNull: true
    },
    change_timeframe: {
      type: dataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user_auth',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  UserAuth.associate = function (models) {
    models.UserAuth.belongsTo(models.User, {
      onDelete: 'CASCADE', // todo: FK is on delete 'set null', and column is null
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserAuth;
};
