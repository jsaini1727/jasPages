const { model, Schema } = require('mongoose');
const dayjs = require('dayjs');


const friendSchema = new Schema(
    {
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        username: {
            type: String,
            required: true,
        }

    });

    const Friend = model('Friend', friendSchema);

module.exports = Friend;