const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const port = 3000;
require('dotenv').config();
const MainRoutes = require('./routes/MainRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDb();
app.use(cors());
app.use('/', MainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});