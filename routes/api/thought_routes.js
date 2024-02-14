const router = require('express').Router();
const Thought = require('../../models')

const thoughtController = require('../../controllers/thoughtControllers')

// Create a thought
router.post('/', thoughtController.createThought);

// Get all thoughts
router.get('/', thoughtController.getAllThoughts);


// Get a single thought by ID
router.get('/:thought_id', thoughtController.getThoughtById);


//  To update a single thought
router.put('/:thought_id', thoughtController.updateThoughtById);

// Delete a thought by its ID
router.delete('/:thought_id', thoughtController.deleteThoughtById)
    
// Post a reaction to a thought by its ID
router.post('/:thought_id/reaction', thoughtController.createReaction);

// Delete a reaction for a thought by its ID
router.delete('/:thought_id/reaction/:reaction_id', thoughtController.deleteReactionById);


module.exports = router;