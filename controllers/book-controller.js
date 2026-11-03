const { BookModel } = require("../models");
const IssuedBook = require("../dtos/books-dto");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find();

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No books in the system"
            });
        }

        return res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message
        });
    }
};

exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await BookModel.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found for id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving book",
            error: error.message
        });
    }
};

exports.addNewBook = async (req, res) => {
    const {data} = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        });
    }

    try {
        const newBook = await BookModel.create(data);

        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: newBook
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding new book",
            error: error.message
        });
    }
};

exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the book"
        });
    }

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: `Book not found for id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error.message
        });
    }
};

exports.deletebookById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: `Book not found for id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error.message
        });
    }
};