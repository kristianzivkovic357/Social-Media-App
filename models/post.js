'use strict';

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    id_post: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    social_network_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'post',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });

  Post.associate = function (models) {
    models.Post.belongsTo(models.SocialNetwork, { foreignKey: { allowNull: false } });
    models.Post.belongsTo(models.AccessToken, { foreignKey: { allowNull: false } });
  };

  return Post;
};
