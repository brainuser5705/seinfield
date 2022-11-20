const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    streak: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('TaskSchema', taskSchema);