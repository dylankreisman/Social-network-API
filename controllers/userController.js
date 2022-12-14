
const { User, Thought } = require('../models')

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    //get single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userID})
        .then((user) => {
        if (!user){
            res.status(400).json({ message: 'User not found with this ID'})
        }
        else {
            res.json(user)
        }
    })
    .catch((err) => res.status(500).json(err))
    },
    //create user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err))
        },
    deleteUser(req, res) {
        User.findOneAndRemove(
            {_id: req.params.userID},
            )
        .then((user) => {
        res.json({ message: 'User deleted'})
        })
    },
    updateUser(req, res) {
        User.updateOne(
            {_id: req.body.userID},
            { $set: req.body },
            { runValidators: true, new: true }
            )
        .then((user) => {
            if (!user) {
            res.status(404).json({ message: 'No user found'})
            }
            else{
            res.json({ message: 'User updated' })
          }
        })
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userID},
            {$addToSet: { friends: req.params.friendsID}},
            { runValidators: true, new: true }
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found'})
            }
            else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err))
    },

   deleteFriend(req, res) {
    User.findOneAndDelete({_id: req.params.userID})
    .then((user) => {
        if (!user){
            res.status(404).json({message: 'Could not delete user'})
        }
        else {
            User.findOneAndUpdate(
                { friends: req.params.userID},
                {$pull: {friends: req.params.friendsID}},
                { new: true }
            )
        }
    })
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: 'Friend deleted, but not updated with the user'})
        }
        else {
            res.json({message: 'Friend successfully deleted!'})
        }
    })
    .catch((err) => {
        res.status(500).json(err)
    })
   }     
}