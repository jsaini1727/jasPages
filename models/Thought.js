const { model, Schema } = require('mongoose');
const dayjs = require('dayjs');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Please enter your thoughts here'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

