'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    first_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  User.associate = function (models) {
    models.User.hasOne(models.UserAuth, { foreignKey: { allowNull: false } });
    models.User.hasOne(models.UserTotp, { foreignKey: { allowNull: false } });
  };

  return User;
};
