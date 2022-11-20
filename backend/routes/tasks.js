const express = require("express");
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    res.json(Task.findAll());
});

// // Get a task
// router.get('/:id', async (req, res) => {
//     const task = await Task.
//     res.json({msg: "GET task by id"});
// });

// Update a task
router.patch('/:id', (req, res) => {
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