'use strict';

module.exports = (sequelize, DataTypes) => {
  var SocialNetwork = sequelize.define('SocialNetwork', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'social_network'
  });

  return SocialNetwork;
};
