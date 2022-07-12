const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: "true",
            message : "User has been successfully added",
            data: dataToSave
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/users', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json({
            success: "true",
            message: "Users retrieved",
            Userlist: data
            });
    }
    catch (error) {
        res.status(500).json({ 
            message: error.message
     });
    }
})

//Get by ID Method
router.get('/user/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        
        res.status(404).json({ message: "Specified user not found, Please enter a valid ID" })
    }
})

//Update by ID Method
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send({
            message: "User updated succesfully",
            updatedDetails:result})
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({
            success: "true",
            message:`Record with the name of ${data.name} has been deleted.`})
    }
    catch (error) {
        res.status(400).json({ message: "User does not exist", 
        error: error.message })
    }
})

module.exports = router;


/*
Code references

https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

*/