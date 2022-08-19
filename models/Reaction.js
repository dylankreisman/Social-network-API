//reaction schema
const {Schema, model} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            min_length: 280
        },
        username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
        }, 
        createdAt: {
            type: Date,
            default: Date.now(),
            get: date => moment(date).format('MMM Do YYYY, h:mm:ss a')
            //need getter method to format timestamp on query
        },

    },
    { toJSON: {
        getters: true,
    },
    id: false
})

    module.exports = reactionSchema