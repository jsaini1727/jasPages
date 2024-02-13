const router = require('express').Router();
const User = require('../../models/User')

const userController = require('../../controllers/userControllers')

// Create a User
router.post('/users', userController.createUser);

// // Get all users
router.get('/users', userController.getAllUsers);


// // Get a single user by ID
router.get('/user/:user_id', userController.getUserById);


// //  To update a single User
router.put('/user/:user_id', userController.updateUserById);

// // Delete a user

router.delete('/user/:user_id', userController.deleteUserById )
    


module.exports = router;