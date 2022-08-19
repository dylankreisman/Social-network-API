const { Schema, model } = require('mongoose')
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        trim: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,"Please create a valid email address"] 
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount')
.get(function () {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User