const express = require ('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const pockemons = require('./src/db/mock-pockemon');

const port = 3000;
const app = express();

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())


sequelize.initDb()

// Ici, nous placerons nos futurs points de terminaison

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemons')(app);
require('./src/routes/updatePokemons')(app);
require('./src/routes/deletePokemon')(app);


// On ajoute la gestion des erreurs 404

app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL';
  res.status(404).json({message});
});

app.listen(port, ()=> console.log(`Notre application node est démarée sur : http://localhost:${port}`));
