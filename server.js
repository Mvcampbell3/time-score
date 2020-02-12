const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`server is live on http://localhost:${PORT}`);
});
