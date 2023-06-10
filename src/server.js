'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRoutes = require('./middleware/auth/routes');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/test', (req, res, next) => {
  console.log('this works');
  res.send('Success');

});
app.use(authRoutes);
app.use('/api/v1', v1);
app.use('/api/v2', v2);

// Catch alls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
