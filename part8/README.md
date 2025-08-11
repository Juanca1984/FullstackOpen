## 📚 GraphQL Library Backend

Este proyecto es un servidor GraphQL para gestionar una biblioteca de libros y autores. Desarrollado como parte de los ejercicios del curso [Full Stack Open](https://fullstackopen.com/es/part8/servidor_graph_ql).

---

## 🚀 Inicio rápido

1. Instala las dependencias:

   ```bash
   npm install
2. Inicia el servidor:

   ```bash
   node library-backend.js
   ```

3. Abre el navegador en:

   ```
   http://localhost:4000
   ```

   Desde allí puedes ejecutar las consultas y mutaciones con GraphQL Playground.

---

## 📌 Consultas disponibles

### 🔢 Número total de libros y autores

```graphql
query {
  bookCount
  authorCount
}
```

---

### 📚 Todos los libros

```graphql
query {
  allBooks {
    title
    author
    published
    genres
  }
}
```

---

### 🧑‍🏫 Todos los autores

```graphql
query {
  allAuthors {
    name
    born
    bookCount
  }
}
```

---

### 📘 Libros filtrados por autor

```graphql
query {
  allBooks(author: "Robert Martin") {
    title
  }
}
```

---

### 📗 Libros filtrados por género

```graphql
query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}
```

---

### 📕 Libros filtrados por autor y género

```graphql
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}
```

---

## ✍️ Mutaciones disponibles

### ➕ Agregar un libro

```graphql
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title
    author
  }
}
```

> 🔄 Si el autor no existe, se crea automáticamente.

---

### 🛠️ Editar año de nacimiento de un autor

```graphql
mutation {
  editAuthor(name: "Martin Fowler", setBornTo: 1963) {
    name
    born
  }
}
```

> 🔍 Si el autor no existe, la mutación devuelve `null`.

---

