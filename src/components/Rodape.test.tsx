import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { Rodape } from './Rodape';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes';

jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockNavegacao = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

describe('onde não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('onde existem participantes suficientes', () => {
  const participantes = ['Ana', 'Catarina', 'Marcela'];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).not.toBeDisabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    expect(mockNavegacao).toHaveBeenCalled();
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
  });
});
