const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.status(200).json({message: 'this is the root route of the server'});
});



module.exports = server;