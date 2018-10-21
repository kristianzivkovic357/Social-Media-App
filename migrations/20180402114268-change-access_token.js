module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('user_access_token', 'access_token', {
      type: Sequelize.STRING(512),
      allowNull: false
    });
  },
  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('user_access_token', 'access_token', {
      type: Sequelize.STRING(256),
      allowNull: false
    });
  }
};
