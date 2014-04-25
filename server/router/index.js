module.exports = function (app) {
  app.use('/', require('./routes/home'));
  app.use('/p/api', require('./routes/api'));
};