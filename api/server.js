const express = require('express');
const projectRouter = require('../api/projectRoutes');
const actionRouter = require('../api/actionRoutes');

const server = express();

server.use(express.json());



server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'this is the root route of the server'});
});

module.exports = server;