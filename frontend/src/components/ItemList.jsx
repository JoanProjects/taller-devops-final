// frontend/src/components/ItemList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Obtén la URL base de las variables de entorno Vite
const API_URL = import.meta.env.VITE_API_BASE_URL;

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/items`);
        setItems(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError('Failed to fetch items.');
        setItems([]); // Limpia items en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleDelete = async (id) => {
      try {
          await axios.delete(`${API_URL}/items/${id}`);
          // Refresca la lista filtrando el item eliminado
          setItems(items.filter(item => item._id !== id));
      } catch (err) {
          console.error("Error deleting item:", err);
          setError('Failed to delete item.');
      }
  };


  if (loading) return <p>Loading items...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} (Quantity: {item.quantity || 1}){' '}
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;