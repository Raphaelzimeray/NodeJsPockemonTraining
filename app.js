const express = require ('express');
const { success, getUniqueId } = require('./helper.js');
let pockemons = require('./mock-pockemon');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

// app.use((req, res, next) => {
//   console.log(`URL : ${req.url}`)
//   next();
// })

app.get('/', (req,res) => res.send('Hello word ! From express 6'));

app.get('/api/pokemons/:id/', (req, res) => {
  const id = parseInt(req.params.id);
  const pockemon = pockemons.find(pockemon => pockemon.id == id);
  const message = 'Un pokemon a bien été trouvé';
  res.json(success(message, pockemon));
  }

)

app.post('/api/pockemons', (req, res) => {
  const id = getUniqueId(pockemons);
  const pockemonCreated = { ...req.body, ...{id: id, created: new Date()}};
  pockemons.push(pockemonCreated);
  const message = `Le pockemon ${pockemonCreated.name} a bien été crée`;
  res.json(success(message, pockemonCreated));
})


app.get('/api/pockemons', (req, res) => {
  const messageAllPockemons = 'la liste des pockemons à bien été récupérée';
  res.json(success(messageAllPockemons, pockemons));
})

app.put('/api/pockemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pockemonUpdated = { ...req.body, id: id, };
  pockemons = pockemons.map(pockemon => {
    return pockemon.id === id ? pockemonUpdated : pockemon
  })
  const message = `le pockemon ${pockemonUpdated.name} a bien été modifié`;
  res.json(success(message, pockemonUpdated));
})

app.delete('/api/pockemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pockemonDeleted = pockemons.find(pockemon => pockemon.id === id);
  pockemons = pockemons.filter(pockemon => pockemon.id !== id);
  const message = `Le pockemon ${pockemonDeleted.name} a bien été supprimé`;
  res.json(success(message, pockemonDeleted));
})

app.listen(port, ()=> console.log(`Notre application node est démarée sur ${port}`));
