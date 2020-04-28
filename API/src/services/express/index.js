const express = require('express');

const createServer = ({ apiRoot, ip, port }, routes) => {
  const app = express();

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