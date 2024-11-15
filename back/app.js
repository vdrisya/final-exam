const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors=require('cors')

require('dotenv').config(); 

const PORT = process.env.PORT || 3001; 

app.use(morgan('dev'));
app.use(cors())

require('./db/connection');

app.use(express.json());

const todoRoutes = require('./route/todoRoute');
const userRoutes=require('./route/user')
app.use('/todo', todoRoutes);

app.use('/user',userRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
