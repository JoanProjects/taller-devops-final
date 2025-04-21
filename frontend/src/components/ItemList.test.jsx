// frontend/src/components/ItemList.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // Necesitamos mockear axios
import ItemList from './ItemList';

// Mockear axios
jest.mock('axios');

// Mockear variables de entorno Vite
vi.stubGlobal('import.meta', {
    env: { VITE_API_BASE_URL: '/api' } // Usa la URL que necesites para el test
});


describe('ItemList Component', () => {
  it('renders loading state initially', () => {
    axios.get.mockResolvedValueOnce({ data: { success: true, data: [] } }); // Mock para evitar warnings
    render(<ItemList />);
    expect(screen.getByText(/loading items.../i)).toBeInTheDocument();
  });

  it('renders items after successful fetch', async () => {
    const mockItems = [
      { _id: '1', name: 'Item 1', quantity: 1 },
      { _id: '2', name: 'Item 2', quantity: 5 },
    ];
    axios.get.mockResolvedValueOnce({ data: { success: true, data: mockItems } });

    render(<ItemList />);

    // Espera a que aparezcan los items
    await waitFor(() => {
      expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Item 2/i)).toBeInTheDocument();
    });
    // Verifica que el mensaje de carga ya no está
    expect(screen.queryByText(/loading items.../i)).not.toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Simula error de red
    render(<ItemList />);

    await waitFor(() => {
      // Busca el mensaje de error definido en el componente
      expect(screen.getByText(/Error: Failed to fetch items./i)).toBeInTheDocument();
    });
     // Verifica que el mensaje de carga ya no está
    expect(screen.queryByText(/loading items.../i)).not.toBeInTheDocument();
  });

   it('renders "No items found" when fetch returns empty array', async () => {
        axios.get.mockResolvedValueOnce({ data: { success: true, data: [] } });
        render(<ItemList />);

        await waitFor(() => {
            expect(screen.getByText(/No items found./i)).toBeInTheDocument();
        });
   });
});