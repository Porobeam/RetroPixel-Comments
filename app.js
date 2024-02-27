const fs = require('fs');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

// hbs settings
hbs.registerPartials(__dirname + '/src/views/partials', function (err) {});
hbsutils.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev', {
    skip: function (req, res) {
        const staticFileExtensions = ['.css', '.js', '.jpg', '.png', '.gif', '.webp'];
        const extension = req.url.split('.').pop();
        return staticFileExtensions.includes(`.${extension}`);
    }
}));

// routes
app.use('/', require('./src/routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});