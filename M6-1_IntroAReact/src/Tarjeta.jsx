function Tarjeta() {
  // Definimos la información estática de la tarjeta
  const nombre = "Abril Meghan Palomino";
  const profesion = "Estudiante";
  const mensaje = "¡Bienvenida/o a mi tarjeta de presentación!";

  // Retornamos el JSX que representa la tarjeta
  return (
    <div id='card'>
      {/* JSX permite incrustar variables en HTML utilizando llaves {} */}
      <h2>{nombre}</h2>
      <h4>{profesion}</h4>
      <p>{mensaje}</p>
    </div>
  );
}

export default Tarjeta;