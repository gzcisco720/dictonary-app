const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const favouriteWords = require('./favourite-words.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/favourites', (_, res) => {
  res.send(favouriteWords)
})

app.post('/favourites', (req, res) => {
  if (!req.body.word) {
    res.sendStatus(400)
  }
  if (!favouriteWords.includes(req.body.word)) {
    favouriteWords.push(req.body.word);
  }
  res.send(favouriteWords)
})

app.delete('/favourites/:word', (req, res) => {
  if (!req.params.word) {
    res.sendStatus(400)
  }

  const index = favouriteWords.indexOf(req.params.word);
  if (index > -1) {
    favouriteWords.splice(index, 1);
  }
  res.send(favouriteWords)
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
