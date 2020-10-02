const express = require('express');
const db = require('../data/helpers/actionModel');
const actionRouter = express.Router();

const idValidator = (res, req, next) => {
  
};

actionRouter.get('/', (res, req) => {

});

module.exports = actionRouter;