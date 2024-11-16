const express = require('express')
const {
    getTests,
    getTest,
    createTest,
    patchTest,
    deleteTest
} = require('../controllers/moduleController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// GET
router.get('/', getTests)
// GET 1
router.get('/:id', getTest)
// POST
router.post('/', createTest)
// DELETE
router.delete('/:id', deleteTest)
// UPDATE
router.patch('/:id', patchTest)

module.exports = router