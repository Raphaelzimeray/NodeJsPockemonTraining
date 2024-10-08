
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pockemons');
const pokemons = require('./mock-pockemon');

const sequelize = new Sequelize('pokedex', 'dev', 'dev', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon
}
