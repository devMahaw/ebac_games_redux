import { screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
    preco: 188.9,
    precoAntigo: 243.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox Series S/X'],
    preco: 121.9,
    precoAntigo: 204.9,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 259.9,
    precoAntigo: 299.9,
    titulo: 'The Legend of Zelda Tears of The Kingdom'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o componente Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('deve renderizar corretamente com a listagem de jogos', async () => {
    renderizaComProvider(<Produtos />)

    await waitFor(() => {
      expect(screen.getByText('Elden Ring')).toBeInTheDocument()
    })
  })
})
