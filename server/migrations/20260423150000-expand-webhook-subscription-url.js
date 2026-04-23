"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("webhook_subscriptions", "url", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("webhook_subscriptions", "url", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
