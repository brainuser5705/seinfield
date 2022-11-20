const express = require("express");
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req,res) => {
    return res.json(await Task.find({}));
});

// Get a task
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    return res.json(await Task.findById(id))
});

// Increment the end date
router.patch('/:id/increment', async (req, res) => {
    td = req.body.dateString;
    console.log(td);
    const {id} = req.params;
    await Task.updateOne({_id: id},{endDate: td});
});

// Create a task
router.post('/', async (req, res) => {
    const {title, startDate, endDate} = req.body;
    const taskJson = {
        "title": title,
        "startDate": startDate,
        "endDate": endDate
    }
    try {
        await Task.create(taskJson);
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