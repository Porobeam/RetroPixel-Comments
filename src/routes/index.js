const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', (req, res) => {
    res.render("index");
});

// Add new comment
router.post('/create', commentsController.create);

// Read all comments
router.get('/read', commentsController.read);

module.exports = router;