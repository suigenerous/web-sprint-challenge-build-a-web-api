const express = require('express');
const projectRouter = require('../api/projectRoutes');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'this is the root route of the server'});
});

server.use('/api/projects', projectRouter);



module.exports = server;