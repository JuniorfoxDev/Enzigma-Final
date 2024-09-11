const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5555;
app.use(cors({
    origin: ['http://localhost:4200'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json()); 

const mongoURI = 'mongodb+srv://vaibhavmeshram2908:vaibhav123@cluster0.1pkf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const taskSchema = new mongoose.Schema({
    assignedTo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
    try {
        const { assignedTo, status, dueDate, priority, description } = req.body;
        if (!assignedTo || !status || !dueDate || !priority || !description) {
            return res.status(400).json({
                message: 'Send all required fields: assignedTo, status, dueDate, priority, description',
            });
        }

        const newTask = { assignedTo, status, dueDate, priority, description };
        const task = await Task.create(newTask);
        return res.status(201).json(task);
    } catch (error) {
        console.error('Error in POST /tasks:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error('Error in GET /tasks:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        console.error('Error in GET /tasks/:id:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.put('/tasks/:id', async (req, res) => {
    try {
        const { assignedTo, status, dueDate, priority, description } = req.body;
        if (!assignedTo || !status || !dueDate || !priority || !description) {
            return res.status(400).json({
                message: 'Send all required fields: assignedTo, status, dueDate, priority, description',
            });
        }

        const { id } = req.params;
        const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error in PUT /tasks/:id:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = await Task.findByIdAndDelete(taskId);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /tasks/:id:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/', (req, res) => {
    return res.status(200).send('Server is Running : Type /tasks ');
});


app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
