const router = require('express').Router();
const Reaction = require('../../models')

const reactionController = require('../../controllers/reactionControllers')

// Create a reaction
router.post('/', reactionController.createReaction);

// // Delete a thought
router.delete('/:reaction_id', reactionController.deleteReactionById )
    


module.exports = router;