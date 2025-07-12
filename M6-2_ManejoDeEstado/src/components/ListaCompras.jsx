import { useState } from "react";
import ListItem from "./ListItem.jsx"; // Importar el componente ListItem

function ListaCompras() {
  // Definir el estado para la lista de compras
  const [productos, setProductos] = useState([]); // Estado de la lista de productos
  const [nuevoProducto, setNuevoProducto] = useState(""); // Estado del input para el nuevo producto a agregar

  // Función para agregar un nuevo producto a la lista
  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto]); // Agregar el nuevo producto al estado "productos" sin perder los productos existentes
      setNuevoProducto(""); // Limpiar el input después de agregar el producto
    }
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (index) => {
    // Completar la lógica para eliminar un producto
    const nuevosProductos = productos.filter((_, i) => index != i); // Filtrar los productos para eliminar el seleccionado
    setProductos(nuevosProductos); // Actualizar el estado con la nueva lista filtrada
  };

  return (
    <div id="lista-compras">
      <h1>Lista de Compras</h1>
      <div id="formulario">
        <input
        type="text"
        value={nuevoProducto} // Vincular el valor del input al estado
        placeholder="Agregar nuevo producto" // Mensaje para el usuario
        onChange={(e) => setNuevoProducto(e.target.value)} // Actualizar el estado "nuevoProducto" al cambiar el input
      />
      <button id="btnAdd" onClick={agregarProducto}>Agregar</button>
      </div>
      <ul> {/*Mostrar lista de productos con map */}
        {productos.map((producto, index) => (
          <ListItem key={index} producto={producto} eliminarProducto={() => eliminarProducto(index)} />
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;