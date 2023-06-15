import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Indicators = () => {
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const response = await axios.get('https://mindicador.cl/api');
        const data = response.data;
        setIndicadores(data);
      } catch (error) {
        console.log('Error al obtener los indicadores', error);
      }
    };

    fetchIndicadores();
  }, []);

  return (
    <div>
      <h1>Indicadores Económicos</h1>
      {indicadores.map((indicador) => (
        <div key={indicador.codigo}>
          <h2>{indicador.nombre}</h2>
          <p>Valor: {indicador.valor}</p>
          <p>Unidad: {indicador.unidad_medida}</p>
        </div>
      ))}
    </div>
  );
};

export default Indicators;
