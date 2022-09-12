const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
// serverio leidimas(sutikimas) bendrauti narsyklei per JS.

const mysql = require('mysql');
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
  res.send('Medziai');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
