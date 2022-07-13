const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


const connectionString = "mongodb+srv://Harsh:rootadmin@tutorial7.hjsb2yn.mongodb.net/tutorial7?retryWrites=true&w=majority"
mongoose.connect(connectionString, {
    useNewUrlParser: true
});

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

app.use('/',(req,res) => {
    res.send("The Tutorial 7 app is working")
})

app.use('/api', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Started at ${3001}`)
})
