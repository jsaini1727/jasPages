const Thought = require('../models/Thought')
const { handleRouteError } = require('../helpers');
const thoughtController = {
    // function to create a user using the post route
    async createThought(req, res) {
        try {
            const user = await Thought.create(req.body);

            res.json(user);
        } catch (error) {
            handleRouteError(error, res)
        }
    },

    // Function to get all thoughts using the get route
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            handleRouteError(err, res);
        }
    },

    // Function to get a single thought by ID
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.user_id);
            if (!thought) return res.status(404).json({
                message: 'User with that ID not found'
            })
            if (thought) return res.status(404).json({
                message: 'Thought with that ID could not be found'
            })

            res.json(thought)

        } catch (err) {
            handleRouteError(err, res)
        }
    },
    // Function to update a single user by ID
//     async updateThoughtById(req, res){
//     const { email, password, newPassword } = req.body
//     try {
//         if(email) {
//             const user = await User.findByIdAndUpdate(req.params.user_id, {
//                 $set: {
//                     email: email
//                 }
//             }, { new: true });

//             res.json(user);
//         }
//         if(password) {
//             const user = await User.findById(req.params.user_id);
//             if (!user) return res.status(404).json({
//                 message: 'User with that ID not found'
//             })
//             // Check if old password is correct
//             const pass_valid = await user.validatePass(password);
//             if (!pass_valid) return res.status(401).json({
//                 message: 'The old password is incorrect'
//             })
//             user.password = newPassword;
//             user.save();
//             res.json(user)
//         }

//     } catch(err) {
//         handleRouteError(err, res)
//     }
// },

    // Function to delete a single thought by ID
    async deleteThoughtById(req, res){
        try {
            await Thought.deleteOne({ _id: req.params.user_id })
            res.json({
                message: 'Thought deleted successfully'
            })
        } catch (err) {
            handleRouteError(err, res);
        }
    }
    }



module.exports = thoughtController
