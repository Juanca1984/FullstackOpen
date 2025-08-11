import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({ show }) => {
  const resultUser = useQuery(ME)
  const genre = resultUser.data?.me?.favoriteGenre

  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (!show || resultUser.loading || resultBooks.loading) {
    return null
  }

  const books = resultBooks.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
