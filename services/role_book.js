'use strict';

const db = require('../models');

module.exports = {
  hasRole
};

async function hasRole (userId, adminId) {
  const role = db.RoleBook.findOne({
    where: {
      user_id: userId,
      admin_id: adminId
    }
  });
  return role;
}
