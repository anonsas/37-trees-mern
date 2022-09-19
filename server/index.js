const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');

const app = express();
app.use(cors()); // serverio sutikimas bendrauti narsyklei per JS.

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'besieliu_cirkas',
});

app.get('/', (req, res) => {
  res.send('Hello Earth');
});

app.get('/trees', (req, res) => {
  const sql = `
  SELECT * FROM trees
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/trees', (req, res) => {
  const sql = `
  INSERT INTO trees (title, height, type)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/trees/:tipas', (req, res) => {
  const sql = `
  SELECT * FROM trees
  WHERE type=?
  `;
  con.query(sql, [req.params.tipas], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/trees/:id', (req, res) => {
  const sql = `DELETE FROM trees WHERE id=?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
