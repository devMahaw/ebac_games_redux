import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
  preco: 188.9,
  precoAntigo: 243.9,
  titulo: 'Hogwarts Legacy'
}

describe('Testes para o componente Produto', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)

    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  })

  test('deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)

    const botao = screen.getByTestId('btn-adicionar-produto')

    fireEvent.click(botao)
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
