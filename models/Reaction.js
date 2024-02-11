const { model, Schema } = require('mongoose');
const dayjs = require('dayjs');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: [true, 'Please enter your reaction here'],
            minlength: 1,
            maxlength: 280
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    });


const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;