const router = require('express').Router()

const {
 getUsers,
 getSingleUser,
 createUser,
 deleteUser,
 updateUser,
 addFriend,
 deleteFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:userID')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser)

router.route('/:userID/friends/:friendID')
.post(addFriend).delete(deleteFriend)

module.exports = router