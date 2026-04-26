const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', year: 1999 },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
];

let nextId = 3;

// GET /books — list all books
router.get('/', (req, res) => {
  res.status(200).json({ count: books.length, books });
});

// GET /books/:id — get single book
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(200).json(book);
});

// POST /books — create a book
router.post('/', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const book = { id: nextId++, title, author, year: year || null };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id — update a book
router.put('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.status(200).json(books[index]);
});

// DELETE /books/:id — delete a book
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  const deleted = books.splice(index, 1)[0];
  res.status(200).json({ message: 'Book deleted', book: deleted });
});

module.exports = router;
