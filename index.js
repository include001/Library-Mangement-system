const express = require("express");

const dotenv = require("dotenv");

const DbConnection = require('./databaseConnection');
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();
const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Home Page :-)"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

const startServer = async () => {
    try {
        await DbConnection();
        app.listen(PORT, () => {
            console.log(`Server is up and running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
};

startServer();
