const { query } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'stock'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM stuffs',
    (error, results) => {
      res.render('index.ejs', {stuffs: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO stuffs (nama, jumlah, harga) VALUES (?, ?, ?)',
    [req.body.stuffNama, req.body.stuffJumlah, req.body.stuffHarga],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM stuffs WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
    )
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM stuffs WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {stuff: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE stuffs SET nama=?, jumlah=?, harga=? WHERE id = ?',
    [req.body.stuffNama, req.body.stuffJumlah, req.body.stuffHarga, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.listen(3000);
