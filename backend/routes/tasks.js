const express = require("express");
const Task = require('../models/Task');

const router = express.Router();

// Get a task
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    if (await Task.exists({task_id: id})){
        return res.json(await Task.findOne({task_id: id}).exec());
    }
    return res.json({"msg": "doesn't exist"});
});

// Increment the end date
router.patch('/:task_id/increment', async (req, res) => {
    td = req.body.dateString;
    console.log(td);
    const {task_id} = req.params;
    await Task.updateOne({task_id: task_id},{endDate: td});
    return res.json(await Task.findOne({task_id: task_id}).exec());
});

// Create a task
router.post('/', async (req, res) => {
    const {title, active, startDate, endDate} = req.body;
    const taskJson = {
        "title": title,
        "startDate": startDate,
        "endDate": endDate,
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