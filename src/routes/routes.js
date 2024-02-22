// routes.js to match all urls
var express = require('express');

const router = express.Router();

const userController = require('./../user/userController');

router.route('/').get((req, res) => {
    res.send('Welcome to the application!');
  });

router.route('/user/getAll').get(userController.getDataConntrollerfn);

router.route('/user/create').post(userController.createUserControllerFn);

router.route('/user/update/:id').patch(userController.updateUserController);

router.route('/user/delete/:id').delete(userController.deleteUserController);

module.exports = router;