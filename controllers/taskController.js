const taskModel = require('../models/taskModel');

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Missing required field' });
    }
    const task = taskModel.createTask(title, description);
    res.status(201).json(task);
}


exports.getAllTasks = (req, res) => {
    res.json(taskModel.getAllTasks());
}

exports.getTaskById = (req, res) => {
    const task = taskModel.getTaskById(req.params.id);
    task ? res.json(task) : res.status(404).json({ message: 'Task not found' });
}

exports.updateTask = (req, res) => {
    const updated = taskModel.updateTask(req.params.id, req.body);
    updated ? res.json(updated) : res.status(404).json({ message: 'Task not found' });
}

exports.deleteTask = (req, res) => {
    const deleted = taskModel.deleteTask(req.params.id);
    deleted ? res.json(deleted) : res.status(404).json({ message: 'Task not found' });
}