'use strict';

module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'role',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  Role.associate = function (models) {
    models.Role.hasMany(models.User, { foreignKey: { allowNull: false } });
  };

  return Role;
};
