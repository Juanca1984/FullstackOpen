import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const { data: initialData } = useQuery(ALL_BOOKS)
  const [getBooks, { data }] = useLazyQuery(ALL_BOOKS)

  const books = data ? data.allBooks : initialData?.allBooks

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre } })
    }
  }, [genre, getBooks])

  if (!show || !books) {
    return null
  }

  const genres = Array.from(new Set(
    initialData.allBooks.flatMap(b => b.genres)
  ))

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map(g => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
