const router = require('express').Router();

const { getMovies, postMovies, deleteMovie } = require('../controllers/movies');
const { validatePostMovies, validateDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validatePostMovies, postMovies);
router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
