// frontend/src/components/AddItemForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function AddItemForm({ onNewItem }) { // Recibe una función para actualizar la lista padre
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Item name cannot be empty.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/items`, {
        name,
        quantity: Number(quantity), // Asegúrate que es número
      });
      // Limpia el formulario
      setName('');
      setQuantity(1);
      // Llama a la función del padre para actualizar la UI (si se proporciona)
      if (onNewItem) {
         // Podemos pasar el nuevo item: onNewItem(response.data.data);
         // O simplemente indicar que se recargue:
         onNewItem();
      }
    } catch (err) {
      console.error("Error adding item:", err);
      setError(err.response?.data?.error || 'Failed to add item.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Name:</label>
          <input
            type="text"
            id="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="itemQuantity">Quantity:</label>
          <input
            type="number"
            id="itemQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
            disabled={submitting}
          />
        </div>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;