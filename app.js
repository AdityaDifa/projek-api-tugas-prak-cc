// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Create - Tambah Buku
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  connection.query(query, [title, author], (err, results) => {
    if (err) {
      console.error('Error inserting book:', err.stack);
      res.status(500).send('Error inserting book');
      return;
    }
    res.status(201).send('Book added successfully');
  });
});

// Read - Ambil Semua Buku
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err.stack);
      res.status(500).send('Error fetching books');
      return;
    }
    res.json(results);
  });
});

// Read - Ambil Satu Buku Berdasarkan ID
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM books WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching book:', err.stack);
      res.status(500).send('Error fetching book');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Book not found');
      return;
    }
    res.json(results[0]);
  });
});

// Update - Perbarui Buku Berdasarkan ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
  connection.query(query, [title, author, year, id], (err, results) => {
    if (err) {
      console.error('Error updating book:', err.stack);
      res.status(500).send('Error updating book');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Book not found');
      return;
    }
    res.send('Book updated successfully');
  });
});

// Delete - Hapus Buku Berdasarkan ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting book:', err.stack);
      res.status(500).send('Error deleting book');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Book not found');
      return;
    }
    res.send('Book deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
