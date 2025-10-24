const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// CORS para permitir requests do frontend (Vercel ou local)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Rotas da API em /api para evitar conflitos (opcional, mas bom)
server.use('/api', router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server rodando na porta ${port}`);
});