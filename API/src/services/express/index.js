const express = require('express');

const createServer = ({ apiRoot, ip, port }, routes) => {
  const app = express();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next(); // res.header("Access-Control-Allow-Origin", "*");// res.header("Access-Control-Allow-Credentials", "true");// res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");// res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");// next();
  });

  app.use(express.json());
  app.use(apiRoot, routes);

  // 404 Error handler jesli nie ma takiego routa 
  app.use((req, res, next) => res.status(404).send({ error: 'Routing not found' }));

  // 400 Error handler
  app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.name === 'CastError')
      return res.status(400).end();
    if (err.name === 'ValidationError')
      return res.status(400).json({ error: err.message });
    return res.status(500).end();
  });

  app.listen(port, ip, () => {
    console.log(`Express server listening on http://${ip}:${port}`)
  });

  return app
}

module.exports = createServer;