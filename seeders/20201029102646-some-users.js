"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Thomas Kraak",
          email: "thomas@kraak.com",
          password: "banana",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Ramin Kader",
          email: "ramin@kader.com",
          password: "kebabsticks",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Igor Sijlbing",
          email: "igor@sijlbing.com",
          password: "chickenroti",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
