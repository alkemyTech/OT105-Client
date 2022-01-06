import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Header_Wed from './Header_Wed';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  let isLogged = false;
  let token = 1;

  const userNotLogged = [
    'Inicio',
    'Nosotros',
    'Contacto',
    'Actividades',
    'Campaña Escolar',
    'Campaña de Juguetes',
    'Iniciar sesión',
  ];

  test('test 1', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} />
      </MemoryRouter>,
    );

    userNotLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });
  });

  const userRegularLogged = ['Donaciones', 'Cerrar sesión'];
  const iniciarSesion = 'Iniciar sesión';

  test('test 2', () => {
    isLogged = true;
    token = 1;

    const { getAllByText, container } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} token={token} />
      </MemoryRouter>,
    );

    userRegularLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });

    expect(container).not.toHaveTextContent(iniciarSesion);
  });

  const userAdminLogged = ['Backoffice', 'Cerrar sesión'];
  const shouldNotBeShown = ['Iniciar sesión', 'Donacion'];

  test('test 3', () => {
    isLogged = true;
    token = 2;

    const { getAllByText, container } = render(
      <MemoryRouter>
        <Header_Wed isLogged={isLogged} token={token} />
      </MemoryRouter>,
    );

    userAdminLogged.forEach((link) => {
      waitFor(() => expect(getAllByText(link)).toBeInTheDocument());
    });
    shouldNotBeShown.forEach((link) => {
      expect(container).not.toHaveTextContent(link);
    });
  });
});
