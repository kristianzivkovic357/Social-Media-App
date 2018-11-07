'use strict';

module.exports = (sequelize, DataTypes) => {
  var File = sequelize.define('File', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    file_id: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'file',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  File.associate = function (models) {
    models.File.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };

  return File;
};
