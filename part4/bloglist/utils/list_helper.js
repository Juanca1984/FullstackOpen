const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = _.countBy(blogs, 'author')
  const topAuthor = Object.entries(counts).reduce((max, [author, blogs]) =>
    blogs > max.blogs ? { author, blogs } : max, { author: '', blogs: 0 })

  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const grouped = _.groupBy(blogs, 'author')
  const summed = Object.entries(grouped).map(([author, blogs]) => ({
    author,
    likes: blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }))

  return _.maxBy(summed, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
