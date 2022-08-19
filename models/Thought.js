const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const moment = require('moment')
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
        },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: date => moment(date).format('MMM Do YYYY, h:mm:ss a')
    },
    username: [
        {
        type: String,
        ref: 'User',
        required: true
        }
    ],
    reactions: [reactionSchema]
    },
    { toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false
    },
)

//virtual for reactionCount sum
thoughtSchema
.virtual('reactionCount')
.get(function (){
    return this.reactions.length
}
)

const Thought = model('thought', thoughtSchema)
module.exports = Thought