const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db-backup.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(3001, () => {
  console.log('server started');
})