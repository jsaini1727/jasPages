const Thought = require('../models/Thought')
const { handleRouteError } = require('../helpers');
const { User } = require('../models');
const thoughtController = {
    // function to create a thought using the post route
    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body
            const newThought = await Thought.create({
                thoughtText: thoughtText,
                username: username,
                user: userId,
            });
            await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

            res.json(newThought);
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
            const thought = await Thought.findById(req.params.thought_id);
            if (!thought) return res.status(404).json({
                message: 'Thought with that ID not found'
            })

            res.json(thought)

        } catch (err) {
            handleRouteError(err, res)
        }
    },
    // Function to update a single thought by ID
    async updateThoughtById(req, res) {
        const { thoughtText } = req.body
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thought_id, {
                $set: {
                    thoughtText: thoughtText
                }
            }, { new: true });

            if (!thought) {
                return res.status(404).json({ message: 'Thought with that ID not found' });
            }
            res.json(thought);
        } catch (err) {
            handleRouteError(err, res)
        }
    },

    // Function to delete a single thought by ID
    async deleteThoughtById(req, res) {
        try {
            await Thought.deleteOne({ _id: req.params.thought_id })
            res.json({
                message: 'Thought deleted successfully'
            })
        } catch (err) {
            handleRouteError(err, res);
        }
    },

    // function to create a reaction using the post route
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findByIdAndUpdate(req.params.thought_id, {
                $push: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            });

            res.json(reaction);
        } catch (error) {
            handleRouteError(error, res)
        }
    },

    // Function to delete a single reaction by its ID
    async deleteReactionById(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thought_id, {
                $push: {reactions: req.body}
            }, 
            {
                runValidators: true,
                new: true
            });

            res.json(updatedThought);
        } catch (error) {
            handleRouteError(error, res)
        }
    }
}




module.exports = thoughtController
