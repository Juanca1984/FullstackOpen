const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const { title, author, url, likes = 0 } = req.body
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title, author, url, likes,
    user: user._id
  })

  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved._id)
  await user.save()
  const result = await Blog.findById(saved._id).populate('user', { username: 1, name: 1 })
  res.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(204).end()

  if (blog.user.toString() !== req.user?.id?.toString()) {
    return res.status(401).json({ error: 'only creator can delete' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const updated = await Blog.findByIdAndUpdate(req.params.id, { likes: body.likes }, { new: true })
  res.json(updated)
})

module.exports = blogRouter
