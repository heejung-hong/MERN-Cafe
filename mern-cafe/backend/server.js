/* Require modules ----------------------------------- */
// Always require and configure near the top
require('dotenv').config();
require('./models/index')
const express = require('express');
const cors = require('cors');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');


/* Require the db connection, models, and seed data -- */
const db = require('./models');


/* Create Express app -------------------------------- */
const app = express();


/* Middleware (app.use) ------------------------------ */
// cross origin resource sharing
app.use(cors())
app.use(logger('dev'))
app.use(express.json())


// use the frontend folder for static files
// app.use(favicon(path.join(__dirname, 'frontend', 'favicon.ico')));
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))


// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});


/* Tell the app to listen on the specified port ------ */
app.listen(process.env.PORT, function () {
  console.log('Express is listening to port', process.env.PORT);
});



