const express = require("express");
const Task = require('../models/Task');

const router = express.Router();

// Get a task
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    return res.json(await Task.findOne({task_id: id}));
});

// Update a task
router.patch('/:task_id', (req, res) => {
    res.json({msg: "UPDATE task by id"});
});

// Create a task
router.post('/', async (req, res) => {
    const {title, active, startDate, streak} = req.body;
    const taskJson = {
        "title": title,
        "startDate": startDate,
        "streak": streak,
        "active": active
    }
    try {
        const task = await Task.create(
            taskJson
        );
    } catch (err) {
        res.json({msg: err.message})
    }
    res.json(taskJson);
});

// Delete a task
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE task by id"});
});

module.exports = router;