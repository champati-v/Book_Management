const express = require("express");
const {
  getBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();


// GET all books
router.get("/", protect, getBooks);


// GET single book
router.get("/:id", protect, getSingleBook);


// CREATE new book
router.post("/", protect, createBook);


// UPDATE book
router.put("/:id", protect, updateBook);


// DELETE book
router.delete("/:id", protect, deleteBook);


module.exports = router;    