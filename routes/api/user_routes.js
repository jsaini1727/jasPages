const router = require('express').Router();
const User = require('../../models')

const userController = require('../../controllers/userControllers')

// Create a User
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);


// Get a single user by ID
router.get('/:user_id', userController.getUserById);


//  To update a single User
router.put('/:user_id', userController.updateUserById);

// Delete a user
router.delete('/:user_id', userController.deleteUserById )

// / Make a friend for a thought by its ID
router.post('/:user_id/friends/:friend_id', userController.createFriend);

// / Delete a reaction for a thought by its ID
router.delete('/:user_id/friends/:friend_id', userController.deleteFriendById);


    


module.exports = router;