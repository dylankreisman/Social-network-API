const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtID})
        .then((thought) => {
            if (!thought){
                res.status(400).json({ message: "No thought with this id!"})
            }
            else {
                res.json(thought)
            }
        })
        .catch((err) => res.status(500).json(err))
    },
    
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: 'No thought made'})
            }
            else {
           return User.findOneAndUpdate(
            {_id: req.body._id},
            {$push: { thoughts: thoughts._id}},
            {new: true}
                )
            }
        })
        .then((user) => {
            if(!user){
                res.status(404).json(
                    {message: 'Error making thought'}
                )
            }
            else {
                res.json('Thought created!')
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
        },

    //delete thought and updates user profile
    deleteThought(req, res) {
        Thought.findOneAndDelete( {_id: req.params.thoughtID})
        .then((thought) => {
          if (!thought){ 
            res.status(404).json({ message: 'No thought found'})
          }
          else {
            User.findOneAndUpdate(
                { thoughts: req.params.thoughtID },
                { $pull: {thoughts: req.params.thoughtID}},
                { new: true } 
            )
          }
        })
        .then((user) => {
            if(!user){
                res.status(404).json({ message: 'Thought deleted, but no user found'})
            }
            else {
                res.json({message: 'Thought successfully deleted!'})
            }
            }
        )
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    updateThought(req, res) {
        Thought.updateOne(
            {_id: req.params.thoughtID},
            { $set: req.body},
            { runValidators: true, new: true}
            )
        .then((thought) => {
            if (!thought) {
            res.status(404).json({ message: 'No thought found'})
            }
            else{
                res.json({ message: 'Update thought success!'})
            }
        })
    }
}



