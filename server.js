const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const db = require('./models');
const router = require('./routes');

const app = express();

nunjucks.configure('views', {noCache: true}); // re-renders, and does not use a cache
app.set('views', __dirname + '/views'); // where to look for files to render when `res.render` gets called (already true by default)
app.set('view engine', 'html'); // if `res.render` gets called, assume you're supposed to render an html file
app.engine('html', nunjucks.render); // if you go to `res.render` some html, use `nunjucks.render to do so

app.use(volleyball); // all requests go through this
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(router);

// error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).render('error');
});

const port = 3000;
db.sync()
.then(function () {
  app.listen(port, function () {
    console.log('Awaiting orders on port', port);
  });
})
.catch(function (err) {
  console.error('Failed to sync db');
  console.error(err.stack);
});
