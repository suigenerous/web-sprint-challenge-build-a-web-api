const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const dbProjects = require('../data/helpers/projectModel');
const projectRouter = require('./projectRoutes');

const actionRouter = express.Router();

const projectIdValidator = () => {
    async (req, res, next) => {
        try {
            if (req.body.project_id){
                const found = await dbProjects.get(req.body.project_id);
                if (found){
                    next();
                }
                else {
                    res.status(400).json({errorMessage: "please provide a project id"});
                };
            } else {
                res.status(404).json({errorMessage: "please provide a valid project id"});
            };
        } catch {
            res.status(500).json({errorMessage: "internal server error"});
        };
    };  
};

actionRouter.get('/', async (req, res) => {
    try {
        const actions = await dbActions.get();
        res.status(200).json({data: actions});
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

actionRouter.get('/:id', async (req, res) => {
    try {
        const action = await dbActions.get(req.params.id);
        if (action){
            res.status(200).json({data: action});
        } else {
            res.status(404).json({errorMessage: "please provide a valid action id"});
        };
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

actionRouter.post('/', projectIdValidator, async (req, res) => {
    try {
        if (req.body.description && req.body.notes && req.body.completed){
            const action = await dbActions.insert(req.body);
            res.status(201).json({data: action});
        }
        else {
            res.status(400).json({errorMessage: "please provide all of the required fields"});
        };
    }
    catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

actionRouter.put('/:id', async (req, res) => {
    try {
        if (req.body.description && req.body.notes && req.body.completed){
            const updated = await dbActions.update(req.params.id, req.body);
            if (updated){
                res.status(200).json({data: updated});
            }
            else {
                res.status(404).json({errorMessage: "please provide a valid action id"});
            };
        } else {
            res.status(400).json({errorMessage: "please provide all of the required fields"});
        };
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

actionRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await dbActions.remove(req.params.id);
        if (deleted){
            res.status(204).json({message: "successfully deleted"});
        } else {
            res.status(400).json({errorMessage: "please provide a valid action id"});
        };
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

module.exports = actionRouter;