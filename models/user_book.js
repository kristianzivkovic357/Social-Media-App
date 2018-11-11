'use strict';

module.exports = (sequelize, DataTypes) => {
  var RoleBook = sequelize.define('RoleBook', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    admin_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'role_book',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  RoleBook.associate = function (models) {
    models.RoleBook.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };

  return RoleBook;
};
