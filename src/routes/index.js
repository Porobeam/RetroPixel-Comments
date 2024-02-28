const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', (req, res) => {
    res.render("index");
});

// Agregar un nuevo comentario
router.post('/create', commentsController.create);

// Obtener todos los comentarios
router.get('/read', commentsController.read);

module.exports = router;