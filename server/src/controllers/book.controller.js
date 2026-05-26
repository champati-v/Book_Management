const Book = require("../models/books.model");


const getBooks = async (req, res) => {
  try {

    const { search, genre } = req.query;

    let query = {};

    // Search by title or author
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by genre
    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query);

    res.status(200).json({
      success: true,
      totalBooks: books.length,
      books,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getSingleBook = async (req, res) => {
  try {

    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const createBook = async (req, res) => {
  try {

    const {
      title,
      author,
      genre,
      publishedYear,
      coverImageUrl,
    } = req.body;

    // Validation
    if (
      !title ||
      !author ||
      !genre ||
      !publishedYear
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      publishedYear,
      coverImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const updateBook = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const deleteBook = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
  getBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};