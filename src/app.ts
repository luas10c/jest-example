import express from 'express'
import { randomUUID } from 'node:crypto'

export const app = express()

const database = new Map()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (request, response) => {
  return response.status(200).json({ token: randomUUID() })
})

app.post('/books', (request, response) => {
  if (!request.headers.authorization) {
    return response.status(401).json({
      message: 'Unauthorized'
    })
  }

  const book = {
    id: randomUUID(),
    ...request.body,
  }

  database.set('books', [...database.get('books') ?? [], book])

  return response.json(book)
})

app.get('/books/:id', (request, response) => {
  const books = database.get('books') ?? []
  if (books.length === 0) {
    return response.status(404).json({
      message: 'Book Not Found'
    })
  }

  const book = books.find(book => book.id === request.params.id)
  if (!book) {
    return response.status(404).json({
      message: 'Book Not Found'
    })
  }

  return response.json(book)
})