const TestModule = require('../models/testModuleModel')
const mongoose = require('mongoose')

// GET
const getTests = async (req, res) => {
    const tests = await TestModule.find({}).sort({ createdAt: -1 })
    res.status(200).json(tests)
}
// GET 1 TEST
const getTest = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Test doesn\'t exist' })
    }

    const test = await TestModule.findById(id)
    if (!test) {
        return res.status(404).json({ error: 'Test doesn\'t exist' })
    }
    res.status(200).json(test)
}
// CREATE/POST
const createTest = async (req, res) => {
    const { id, title, over } = req.body
    // add doc to db
    try {
        const test = await TestModule.create({ id, title, over })
        res.status(200).json(test)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// DELETE
const deleteTest = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Test doesn\'t exist' })
    }

    const test = await TestModule.findOneAndDelete({ _id: id })

    if (!test) {
        return res.status(400).json({ error: 'Test doesn\'t exist' })
    }

    res.status(200).json(test)
}
// UPDATE
const patchTest = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Test doesn\'t exist' })
    }

    const test = await TestModule.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!test) {
        return res.status(400).json({ error: 'Test doesn\'t exist' })
    }

    res.status(200).json(test)
}

module.exports = {
    getTests,
    getTest,
    createTest,
    deleteTest,
    patchTest
}