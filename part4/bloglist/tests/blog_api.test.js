import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const api = supertest(app)

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  token = loginResponse.body.token

  const blogObjects = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
  ].map(blog => new Blog({ ...blog, user: savedUser._id }))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200)
  assert.strictEqual(response.headers['content-type'].includes('application/json'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Fullstack Open',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 3)
})

test('blog without likes has default of 0', async () => {
  const newBlog = {
    title: 'No Likes Blog',
    author: 'Anonymous',
    url: 'https://nolikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title/url is not added', async () => {
  const newBlog = {
    author: 'No Title',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog can be deleted by creator', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToDelete = blogs.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const resultBlogs = await api.get('/api/blogs')
  assert.strictEqual(resultBlogs.body.length, 1)
})

test('blog can be updated', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToUpdate = blogs.body[0]

  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})
