const router = require('express').Router();
const User = require('../../models/User')
const { handleRouteError } = require('../../helpers');


// Create a User
router.post('/users', async (req, res) => {
    try {
        // const user = await connection;
        
        const user = await User.create(req.body);

        // Another way of creating a new user by using the constructor syntax but is 2 step method
        // const user = new User(req.body);
        // user.save();

        res.json(user);
    } catch (err) {
        handleRouteError(err, res);
    }
})

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        handleRouteError(err, res);
    }
});


// Get a single user by ID
router.get('/user/:user_id', async (req, res) => {

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

});


//  To update a single User
router.put('/user/:user_id', async (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
    
        if (email) {
            const user = await User.findByIdAndUpdate(req.params.user_id, {
                $set: {
                    email: email
                }
            }, { new: true });

            res.json(user);
        }

        if (password) {

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

    } catch (err) {
        handleRouteError(err, res)
    }

});

// Delete a user

router.delete('/user/:user_id', async (req, res) => {

    try {
        await User.deleteOne({ _id: req.params.user_id })
        res.json({
            message: 'User deleted successfully'
        })
    } catch (err) {
        handleRouteError(err, res);
    }
});


module.exports = router;