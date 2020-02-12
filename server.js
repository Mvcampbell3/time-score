const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true });
});

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
