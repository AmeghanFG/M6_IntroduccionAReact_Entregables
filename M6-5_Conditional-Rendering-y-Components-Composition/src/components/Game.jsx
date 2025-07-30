import { useState, useEffect } from 'react';
import React from 'react'
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

const Game = () => {
    // TODO: Estados
    const [numeroAleatorio, setNumeroAleatorio] = useState();
    const [numeroIngresado, setNumeroIngresado] = useState();
    const [mensaje, setMensaje] = useState('');

    // *Número random entre 1 y 100
    useEffect(() => {
        const generarNumero = Math.floor(Math.random() * 100) + 1;
        setNumeroAleatorio(generarNumero);
    }, []);

    // Acciones
    const handleAdvinar = () => {
        if (isNaN(numeroIngresado)) {
            setMensaje('Ingrese un número válido');
        } else if (parseInt(numeroIngresado) === numeroAleatorio) {
            setMensaje('¡Correcto!');
        } else if (parseInt(numeroIngresado) < numeroAleatorio) {
            setMensaje('El número es menor');
        } else if (parseInt(numeroIngresado) > numeroAleatorio) {
            setMensaje('El número es mayor');
        } else {
            setMensaje('');
        }
  };

  const handleReiniciar = () => {
    const nuevoNumero = Math.floor(Math.random() * 100) + 1;
    setNumeroAleatorio(nuevoNumero);
    setNumeroIngresado('');
    setMensaje('');
  }

  return (
    <div id = "contenedor-juego">
        {/* Componentes */}
        <h2>Adivina el número</h2>
        <InputNumber numeroIngresado={numeroIngresado} setNumeroIngresado={setNumeroIngresado}/>
        <Message mensaje={mensaje}/>
        <div className='botones'>
            <button onClick={handleAdvinar}>Adivinar</button>
            <RestartButton handleReiniciar={() => handleReiniciar()} />
        </div>
    </div>
  )
}

export default Game