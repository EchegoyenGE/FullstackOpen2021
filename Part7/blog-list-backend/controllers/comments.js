const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    const returnedComments = await Comment.find({})
    response.json(returnedComments.map(comment => comment.toJSON()))
})

commentsRouter.post('/:id', async (request, response) => {
    const { id } = request.params
    const { content } = request.body

    if (content === '') {
        return response.json({ error: 'empty content' })
    }

    const comment = new Comment({
        content,
        blog: id
    })
    const savedComment = await comment.save()
    response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter