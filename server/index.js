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
  SELECT *
  FROM trees
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
