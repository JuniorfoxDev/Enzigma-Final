
const express = require('express')
const { Task } = require('../models/taskModels')
const router = express.Router();

// 1. Route for Save a new Task
router.post('/', async (request, response) => {
    try {
        // Validate request body
        const { assignedTo, status, dueDate, priority, description } = request.body;
        if (!assignedTo || !status || !dueDate || !priority || !description) {
            return response.status(400).send({
                message: 'Send all required fields: assignedTo, status, dueDate, priority, description',
            });
        }

        const newTask = { assignedTo, status, dueDate, priority, description };

        const task = await Task.create(newTask);

        return response.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

// 2. Route for Get all Tasks from Database
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

// 3. Route for Get a Task by Id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const task = await Task.findById(id);

        if (!task) {
            return response.status(404).json({ message: 'Task not found' });
        }

        return response.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

// 4. Route for Update a Task
router.put('/:id', async (request, response) => {
    try {
        // Validate request body
        const { assignedTo, status, dueDate, priority, description } = request.body;
        if (!assignedTo || !status || !dueDate || !priority || !description) {
            return response.status(400).send({
                message: 'Send all required fields: assignedTo, status, dueDate, priority, description',
            });
        }

        const { id } = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
        }

        return response.status(200).send({ message: 'Task updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

// 5. Route for Delete a Task
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Task.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
        }

        return response.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});
module.exports = router;
