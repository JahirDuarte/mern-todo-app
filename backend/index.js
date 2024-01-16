const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Models
const TodoModel = require('./models/Todo')

// Express Server
const app = express()
app.use(cors())
app.use(express.json())

// Database conection
// lohalhost
const dbUrl = 'mongodb://localhost:27017/test';

// MongoDB Config
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Handling application shutdown
app.on('close', () => {
    mongoose.connection.close(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});

// Endpoints
app.get('/get', (req, res) => {
    const task = req.body.task;
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task:task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// Server Port
app.listen(3001, () => {
    console.log("Server is Running")
})