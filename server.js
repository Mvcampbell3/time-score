const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost/timescore', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('mongoose connected');
    app.listen(PORT, () => {
      console.log(`server is live on http://localhost:${PORT}`);
    });
  });
