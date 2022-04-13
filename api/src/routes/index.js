const { Router } = require('express');
const pokemonRoute = require('./pokemons');
const typesRoute = require('./types');

const router = Router();

router.use('/pokemons', pokemonRoute);
router.use('/types', typesRoute);

module.exports = router;
