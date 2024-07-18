const express = require ('express');
const { success } = require('./helper.js');
let pockemons = require('./mock-pockemon');
const favicon = require('serve-favicon');
const morgan = require('morgan');

const app = express();

const port = 3000;

app.use(morgan('dev'));

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

app.get('/api/pockemons', (req, res) => {
  const messageAllPockemons = 'la liste des pockemons à bien été récupérée';
  res.json(success(messageAllPockemons, pockemons));
})


app.listen(port, ()=> console.log(`Notre application node est démarée sur ${port}`));
