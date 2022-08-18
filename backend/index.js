const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', authRoutes);
app.use('/habit', habitRoutes);

mongoose.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(result => {
        app.listen(process.env.PORT || 7070)
    })
    .catch(err => {
        console.log(err);
    })
