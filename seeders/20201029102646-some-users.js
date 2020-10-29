"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Thomas Kraak",
          email: "thomas@kraak.com",
          password: bcrypt.hashSync("banana", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Ramin Kader",
          email: "ramin@kader.com",
          password: bcrypt.hashSync("kebabsticks", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Igor Sijlbing",
          email: "igor@sijlbing.com",
          password: bcrypt.hashSync("chickenroti", 10),
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
