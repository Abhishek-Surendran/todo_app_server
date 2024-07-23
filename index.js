const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

let todos = [];
let currentId = 1;

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: currentId++,
        task: req.body.task,
        completed: req.body.completed || false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
});

// Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    const updatedTodo = {
        ...todos[todoIndex],
        task: req.body.task !== undefined ? req.body.task : todos[todoIndex].task,
        completed: req.body.completed !== undefined ? req.body.completed : todos[todoIndex].completed,
    };
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
