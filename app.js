const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Mongo Connection
const uri = process.env.MONGODB_CONNECT_URI;
mongoose.connect(uri)
.then(() => {
    console.log('Connected to database');
})
.catch(err => {
    console.error('ERROR CONNECTING TO DATABASE: ', err);
});

// Handlebars settings
hbs.registerPartials(__dirname + '/src/views/partials', function (err) {});
hbsutils.registerPartials(__dirname + '/views/partials');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev', {
    skip: function (req, res) {
        const staticFileExtensions = ['.css', '.js', '.jpg', '.png', '.gif', '.webp'];
        const extension = req.url.split('.').pop();
        return staticFileExtensions.includes(`.${extension}`);
    }
}));

// Routes
app.use('/', require('./src/routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server listener
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});