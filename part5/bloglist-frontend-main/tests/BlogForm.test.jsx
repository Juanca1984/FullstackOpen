import { describe, test, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../src/components/BlogForm.jsx'

describe('<BlogForm />', () => {
  test('5.16: llama a la función onSubmit con los datos correctos', () => {
    const mockCreate = vi.fn()

    const component = render(<BlogForm createBlog={mockCreate} />)

    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://test.com' } })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
    })
  })
})
