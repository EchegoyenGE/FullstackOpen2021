const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//Get all blogs
blogsRouter.get('/', async (request, response) => {
    const returnedBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(returnedBlogs.map(note => note.toJSON()))
})

//Post a blog
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body
    const token = request.res.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (title === undefined || url === undefined) {
        return response.status(400).end()
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
})

//Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    const token = request.res.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const blogToEliminate = await Blog.findById(id)

    if (!token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (decodedToken.id.toString() !== blogToEliminate.user.toString()) {
        return response.status(401).json({ error: 'this is not your blog' })
    }

    await Blog.findByIdAndRemove(id)
    return response.status(204).send({ remove: 'successful' })
})

//update a blog 
blogsRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const { title, url, author, likes } = request.body

    const blog = {
        title: title,
        url: url,
        author: author,
        likes: likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter