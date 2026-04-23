"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("webhook_subscriptions", "url", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      "SELECT COUNT(*)::int AS count FROM webhook_subscriptions WHERE char_length(url) > 255;"
    );
    const longUrlCount = Number(results[0]?.count ?? 0);

    if (longUrlCount > 0) {
      throw new Error(
        `Cannot rollback webhook_subscriptions.url to VARCHAR(255): found ${longUrlCount} URLs longer than 255 characters.`
      );
    }

    await queryInterface.changeColumn("webhook_subscriptions", "url", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
