const router = require('express').Router();
const Thought = require('../../models')

const thoughtController = require('../../controllers/thoughtControllers')

// Create a thought
router.post('/', thoughtController.createThought);

// // Get all thoughts
router.get('/', thoughtController.getAllThoughts);


// // Get a single Thought by ID
router.get('/:thought_id', thoughtController.getThoughtById);


// //  To update a single Thought
// router.put('/:thought_id', thoughtController.upda);

// // Delete a thought
router.delete('/:thought_id', thoughtController.deleteThoughtById )
    


module.exports = router;