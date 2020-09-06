/** In this folder the server starts */

const express = require('express');
const cors = require('cors')

const app = express();

// middlewares
app.use(cors())
app.use(express.json()); // Server can understand objects
app.use(express.urlencoded({extended: false})); // To process data from forms

// Routes
app.use(require('./routes/index'));

app.listen(4000);
console.log('Server is running on port, 4000');