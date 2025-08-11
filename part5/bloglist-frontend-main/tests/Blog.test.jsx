import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from '../src/components/Blog.jsx'


describe('<Blog />', () => {
  const blog = {
    title: 'Testing React components',
    author: 'John Tester',
    url: 'http://example.com/test-blog',
    likes: 42,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    }
  }

  const user = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
  }

  test('5.13: muestra título y autor, pero no url ni likes por defecto', () => {
    render(<Blog blog={blog} user={user} likeBlog={() => {}} removeBlog={() => {}} />)

    const element = screen.getByTestId('blog-summary')
    expect(element).toHaveTextContent('Testing React components')
    expect(element).toHaveTextContent('John Tester')

    const details = screen.queryByTestId('blog-details')
    expect(details).toBeNull()
  })

  test('5.14: muestra url y likes cuando se hace clic en el botón "view"', () => {
    render(<Blog blog={blog} user={user} likeBlog={() => {}} removeBlog={() => {}} />)

    const button = screen.getByText('view')
    fireEvent.click(button)

    const details = screen.getByTestId('blog-details')
    expect(details).toHaveTextContent('http://example.com/test-blog')
    expect(details).toHaveTextContent('likes 42')
  })

  test('5.15: al hacer click dos veces en el botón "like" se llama dos veces la función', () => {
    const mockLike = vi.fn()

    render(<Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={() => {}} />)

    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLike).toHaveBeenCalledTimes(2)
  })
})
