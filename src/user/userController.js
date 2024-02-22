var userService = require('./userService');

var getDataConntrollerfn = async (req, res) => {
    try {
        var employees = await userService.getDataFromDBService();
        res.status(200).send({ "status": true, "data": employees });
    } catch (error) {
        console.error('getDataConntrollerfn Error:', error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

var createUserControllerFn = async (req, res) => {
    try {
        var status = await userService.createUserDBService(req.body);
        if (status) {
            res.status(201).send({ "status": true, "message": "User created successfully" });
        } else {
            res.status(400).send({ "status": false, "message": "Error creating user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

var updateUserController = async (req, res) => {
    try {
        var result = await userService.updateUserDBService(req.params.id, req.body);
        if (result) {
            res.status(200).send({ "status": true, "message": "User Updated Successfully" });
        } else {
            res.status(404).send({ "status": false, "message": "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

var deleteUserController = async (req, res) => {
    try {
        var result = await userService.removeUserDBService(req.params.id);
        if (result) {
            res.status(200).send({ "status": true, "message": "User Deleted Successfully" });
        } else {
            res.status(404).send({ "status": false, "message": "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

module.exports = { getDataConntrollerfn, createUserControllerFn, updateUserController, deleteUserController };
