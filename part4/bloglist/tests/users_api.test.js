import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import User from '../models/user.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testpass',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
})

test('creation fails with proper status and message if username already taken', async () => {
  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'password',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.ok(result.body.error.includes('username must be unique'))
})

test('creation fails if password too short', async () => {
  const newUser = {
    username: 'shortpass',
    name: 'Short Pass',
    password: 'pw'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  
    assert.ok(result.body.error.includes('password missing or too short'))
})

after(async () => {
  await mongoose.connection.close()
})
