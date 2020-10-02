const express = require('express');
const db = require('../data/helpers/projectModel');
const dbActions = require('../data/helpers/actionModel');

const projectRouter = express.Router();

projectRouter.get('/', async (req, res) => {
    try {
        const projects = await db.get();
        res.status(200).json({data: projects});
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

projectRouter.get('/:id', async (req, res) => {
    try {
        const project = await db.get(req.params.id);
        if (project){
            res.status(200).json({data: project});
        }
        else {
            res.status(404).json({errorMessage: "please provide a valid id"});
        }
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

projectRouter.get('/:id/actions', async (req, res) => {
    try {
        const actions = db.getProjectActions(req.params.id);
        if (actions.length){
            res.status(200).json({data: actions});
        } else {
            res.status(404).json({errorMessage: "please provide a valid id"});
        }
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

projectRouter.post('/', async (req, res) => {
    try {
        if (req.body.name && req.body.description && req.body.completed){
            const newProject = await db.insert(req.body);
            res.status(201).json({data: newProject});
        } else {
            res.status(400).json({errorMessage: "please provide all of the required fields"});
        };
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

projectRouter.put('/:id', async (req, res) => {
    try {
        if (req.body.name && req.body.description && req.body.completed){
            const updated = await db.insert(req.params.id, req.body);
            if (updated.length){
                res.status(200).json({data: updated});
            }
            else {
                res.status(404).json({errorMessage: "please provide a valid id"});
            };
        } else {
            res.status(400).json({errorMessage: "please provide all of the required fields"});
        };
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

projectRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.remove(req.params.id);
        if (deleted.length){
            res.status(204).json({message: "succesfully deleted"});
        } else {
            res.status(404).json({errorMessage: "please provide a valid id"});
        }
    } catch {
        res.status(500).json({errorMessage: "internal server error"});
    };
});

module.exports = projectRouter;