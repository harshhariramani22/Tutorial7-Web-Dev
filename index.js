//require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
//const mongoString = process.env.DATABASE_URL;

const connectionString = "mongodb+srv://Harsh:rootadmin@tutorial7.hjsb2yn.mongodb.net/tutorial7?retryWrites=true&w=majority"
mongoose.connect(connectionString, {
    useNewUrlParser: true
});

//mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})