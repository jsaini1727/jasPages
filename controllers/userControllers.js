const User = require('../models/User')
const { handleRouteError } = require('../helpers');
const userController = {
    // function to create a user using the post route
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.json(user);
        } catch (error) {
            handleRouteError(error, res)
        }
    },

    // Function to get all users using the get route
    async getAllUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            handleRouteError(err, res);
        }
    },

    // Function to get a single user by ID
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.user_id);
            if (!user) return res.status(404).json({
                message: 'User with that ID not found'
            })
            if (!user) return res.status(404).json({
                message: 'User with that ID could not be found'
            })

            res.json(user)

        } catch (err) {
            handleRouteError(err, res)
        }
    },
    // Function to update a single user by ID
    async updateUserById(req, res){
    const { email, password, newPassword } = req.body
    try {
        if(email) {
            const user = await User.findByIdAndUpdate(req.params.user_id, {
                $set: {
                    email: email
                }
            }, { new: true });

            res.json(user);
        }
        if(password) {
            const user = await User.findById(req.params.user_id);
            if (!user) return res.status(404).json({
                message: 'User with that ID not found'
            })
            // Check if old password is correct
            const pass_valid = await user.validatePass(password);
            if (!pass_valid) return res.status(401).json({
                message: 'The old password is incorrect'
            })
            user.password = newPassword;
            user.save();
            res.json(user)
        }

    } catch(err) {
        handleRouteError(err, res)
    }
},
    async deleteUserById(req, res){
        try {
            await User.deleteOne({ _id: req.params.user_id })
            res.json({
                message: 'User deleted successfully'
            })
        } catch (err) {
            handleRouteError(err, res);
        }
    }
    }



module.exports = userController

