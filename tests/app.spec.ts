import supertest from "supertest"

import { app } from '#/app'

let token = ''
let bookId = ''

describe('App Tests', () => {

  beforeAll(() => {
    (async () => {
      const auth = await supertest(app).post('/')
      token = auth.body.token
    })()
  })

  it('create a book without authenticated', async () => {
    const createBook = await supertest(app).post('/books').send({
      name: 'O minimo que você precisa saber para não ser um idiota útil',
      author: 'Olavo de Carvalho'
    })

    expect(JSON.parse(createBook.text)?.message).toBe('Unauthorized')
  })

  it('find a book without books', async () => {
    const findBook = await supertest(app).get('/books/c693c0c3-ad04-49b7-a9cc-200291597d61')

    expect(findBook.notFound).toBeTruthy()
  })


  it('create a book', async () => {
    const createBook = await supertest(app).post('/books').send({
      name: 'O minimo que você precisa saber para não ser um idiota útil',
      author: 'Olavo de Carvalho'
    }).set({
      authorization: `Bearer ${token}`
    })

    expect(createBook.statusCode).toBe(200)

    bookId = createBook.body.id
  })

  it('find book with id inexisting', async () => {
    const findBook = await supertest(app).get('/books/c693c0c3-ad04-49b7-a9cc-200291597d61')

    expect(findBook.notFound).toBeTruthy()
  })

  it('find a book by id', async () => {
    const findBook = await supertest(app).get(`/books/${bookId}`).set({
      authorization: `Bearer ${token}`
    })

    expect(findBook.statusCode).toBe(200)

    expect(findBook.body).toStrictEqual(expect.objectContaining({
      name: 'O minimo que você precisa saber para não ser um idiota útil',
      author: 'Olavo de Carvalho'
    }))
  })
})