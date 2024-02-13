const express = require('express');
const app = express();

const PORT = process.env.PORT || 3003;

const connection = require('./config/connection');


const {user_routes} = require('./routes/api');


app.use(express.json());

// Open a channel to allow url encoded data through
app.use(express.urlencoded({ extended: false }));

// Load Routes
app.use('/api', [user_routes])


connection.on('open', () => {
    app.listen(PORT, () => console.log('Server started on port', PORT));
})

