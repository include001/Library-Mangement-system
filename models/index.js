const UserModel = require("./user-model");
// Centralize the model imports and export them for use throughout the application.

const BookModel = require("./book-model");

module.exports = {
    UserModel,
    BookModel
};

// this file serves as an index for the models, allowing for easier imports in other parts of the application,
// and it exports the userModel and bookModel, which can be used to interact with the database.