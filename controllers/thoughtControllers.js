const Thought = require('../models/Thought')
const { handleRouteError } = require('../helpers');
const thoughtController = {
    // function to create a user using the post route
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            res.json(this.getThoughtById);
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
            if (thought) return res.status(404).json({
                message: 'Thought with that ID could not be found'
            })

            res.json(thought)

        } catch (err) {
            handleRouteError(err, res)
        }
    },
    // Function to update a single thought by ID
    async updateThoughtById(req, res) {
        const thoughtText = req.body
        try {
            const thought = await UserThought.findByIdAndUpdate(req.params.thought_id, {
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
