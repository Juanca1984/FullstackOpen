const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid')

let authors = [
  { name: 'Robert Martin', id: "afa51ab0", born: 1952 },
  { name: 'Martin Fowler', id: "afa5b6f0", born: 1963 },
  { name: 'Fyodor Dostoevsky', id: "afa5b6f1", born: 1821 },
  { name: 'Joshua Kerievsky', id: "afa5b6f2" },
  { name: 'Sandi Metz', id: "afa5b6f3" },
]

let books = [
  { title: 'Clean Code', published: 2008, author: 'Robert Martin', id: "b1", genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, author: 'Robert Martin', id: "b2", genres: ['agile', 'patterns', 'design'] },
  { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', id: "b3", genres: ['refactoring'] },
  { title: 'Refactoring to patterns', published: 2008, author: 'Joshua Kerievsky', id: "b4", genres: ['refactoring', 'patterns'] },
  { title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby', published: 2012, author: 'Sandi Metz', id: "b5", genres: ['refactoring', 'design'] },
  { title: 'Crime and punishment', published: 1866, author: 'Fyodor Dostoevsky', id: "b6", genres: ['classic', 'crime'] },
  { title: 'Demons', published: 1872, author: 'Fyodor Dostoevsky', id: "b7", genres: ['classic', 'revolution'] },
]

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: () => {
      return authors.map(author => {
        const count = books.filter(b => b.author === author.name).length
        return {
          ...author,
          bookCount: count
        }
      })
    }
  },

  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() }
      books = books.concat(newBook)

      if (!authors.find(a => a.name === args.author)) {
        const newAuthor = { name: args.author, id: uuid() }
        authors = authors.concat(newAuthor)
      }

      return newBook
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null

      const updated = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updated : a)
      return updated
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
