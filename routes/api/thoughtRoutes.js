const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)
.post(createThought)

router.route('/:thoughtID').
get(getSingleThought).
delete(deleteThought).
put(updateThought)

module.exports = router