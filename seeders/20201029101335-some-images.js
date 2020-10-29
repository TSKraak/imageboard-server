"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "images",
      [
        {
          title: "kittens",
          url:
            "https://indebuurt.nl/rotterdam/wp-content/uploads/2018/06/kittens-800x500.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "husky puppies",
          url:
            "https://cdn.shopify.com/s/files/1/0048/6224/6985/products/Husky-Pups.jpg?v=1593509060",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "chameleon",
          url:
            "https://i.pinimg.com/originals/14/c6/4e/14c64e4d48d405536d182b9c3b72186e.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "valkparkieten",
          url:
            "https://img.point.pet/images/cockatiel--couple-603587636-5b554c5346e0fb003781d630.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("images", null, {});
  },
};
