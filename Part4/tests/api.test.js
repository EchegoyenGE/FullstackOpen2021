const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./apiHelper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')


describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const titles = blogsAtStart.map(blog => blog.title)
    expect(titles).toContain('Second blog')
  })

})

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const resultBlog = await api
      .get(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.title).toEqual(blogsAtStart[0].title)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with valid data', async () => {

    const newUser = {
      username: 'gaston1',
      name: 'gaston1',
      password: 'gaston1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'me',
      url: 'www.myurl.com',
      likes: 24
    }

    const loginUser = {
      username: 'gaston1',
      password: 'gaston1'
    }

    const userData = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)

    const token = `Bearer ${userData.body.token}`

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('fails with status code 400 if data invalid', async () => {

    const newUser = {
      username: 'gaston1',
      name: 'gaston1',
      password: 'gaston1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const newBlog = {
      title: 'async/await simplifies making async calls'
    }

    const loginUser = {
      username: 'gaston1',
      password: 'gaston1'
    }

    const userData = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)

    const token = `Bearer ${userData.body.token}`

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
  })

  test('succeeds with status code 204 if id is valid', async () => {

    const newUser = {
      username: 'gaston1',
      name: 'gaston1',
      password: 'gaston1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'me',
      url: 'www.myurl.com',
      likes: 24
    }

    const loginUser = {
      username: 'gaston1',
      password: 'gaston1'
    }

    const userData = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)

    const token = `Bearer ${userData.body.token}`

    const blogToDelete = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log("Blog to delete id: ", blogToDelete.body.id)
    console.log("token: ", token)

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set('Authorization', token)
      .expect(204)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})