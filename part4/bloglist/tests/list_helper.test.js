const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'https://cleancode.com',
    likes: 10,
    __v: 0
  },
  {
    _id: '3',
    title: 'Refactoring',
    author: 'Martin Fowler',
    url: 'https://refactoring.com',
    likes: 12,
    __v: 0
  },
  {
    _id: '4',
    title: 'TDD By Example',
    author: 'Kent Beck',
    url: 'https://tdd.com',
    likes: 0,
    __v: 0
  },
  {
    _id: '5',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    url: 'https://cleancode.com',
    likes: 7,
    __v: 0
  },
  {
    _id: '6',
    title: 'Agile Principles',
    author: 'Robert C. Martin',
    url: 'https://cleancode.com',
    likes: 3,
    __v: 0
  }
]

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of one blog is the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 5)
  })

  test('of bigger list is calculated correctly', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 37)
  })
})

describe('favorite blog', () => {
  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Refactoring',
      author: 'Martin Fowler',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('returns author with highest blog count', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('returns author with highest like total', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      likes: 20
    })
  })
})
