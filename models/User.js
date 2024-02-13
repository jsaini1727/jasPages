const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'You must end a User name'],
            unique: true,
            trimmed: true
        },
        email: {
            type: String,
            required: [true, 'You must enter a valid email address'],
            unique: true,
            validate: {
                validator(val) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'

            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    });


userSchema.pre('save', async (next) => {
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }
    next();
});

userSchema.methods.validatePass = async function (formPassword) {
    const is_valid = await compare(formPassword, this.password);

    return is - valid
};

const User = model('User', userSchema);

module.exports = User;

