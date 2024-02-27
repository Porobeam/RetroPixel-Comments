const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', (req, res) => {
    res.render("index");
});

// Agregar un nuevo comentario
router.post('/comments', commentsController.addComment);

// Obtener todos los comentarios
router.get('/comments', commentsController.readComments);

module.exports = router;