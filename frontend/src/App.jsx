// frontend/src/App.jsx
import React from 'react';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import './App.css';

function App() {
  // Clave simple para forzar la recarga de ItemList cuando se añade un item
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleNewItem = () => {
    setRefreshKey(oldKey => oldKey + 1); // Cambia la key para que ItemList se remonte y recargue
  };

  return (
    <div className="App">
      <h1>DevOps Project App</h1>
      <hr />
      <AddItemForm onNewItem={handleNewItem} />
      <hr />
      {/* Usamos la key para forzar la recarga */}
      <ItemList key={refreshKey} />
    </div>
  );
}

export default App;