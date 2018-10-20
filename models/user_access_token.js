'use strict';

module.exports = (sequelize, DataTypes) => {
  var AccessToken = sequelize.define('AccessToken', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING(256),
      allowNull: false
    }

  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user_access_token'
  });

  AccessToken.associate = function (models) {
    models.AccessToken.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.AccessToken.hasMany(models.Post, { foreignKey: { allowNull: false } });
    models.AccessToken.belongsTo(models.SocialNetwork, { foreignKey: { allowNull: false } });
  };

  return AccessToken;
};
