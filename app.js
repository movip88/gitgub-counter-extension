const express = require('express');
const app = express();
const port = 3000;
const {getFilesRepository} = require('./services/counter');

app.get('/:owner/:repo', async (req, res) => {
  const resposne = await getFilesRepository({owner: req.params.owner, repo: req.params.repo});
  res.send(resposne)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});