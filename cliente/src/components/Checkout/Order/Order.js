import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';

const TransactionComponent = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [newData, setNewData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/webpay_plus/commit?token_ws=01ab70390461d23dc3836eabb36b3eeb3b1efe93e83afedd922dc3c7b734f555`); // Ruta en el servidor para obtener los datos de la transacción
            const data = response.data;
            console.log(data);
            // console.log(data.viewData);
            setTransactionData(data);
            setNewData(data.viewData);
          } catch (error) {
            console.log('Error al obtener los datos de la transacción', error);
          }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        {transactionData ? (
          <div>
            <h1>Detalles de la transacción</h1>
            <p>Paso: {transactionData.step}</p>
            <p>Descripción: {transactionData.stepDescription}</p>
            <p>Token : {newData.token}</p>
            <p>Amount : {newData.commitResponse.amount}</p>
            <p>authorization_code : {newData.commitResponse.authorization_code}</p>
            <p>buy_order : {newData.commitResponse.buy_order}</p>
            <p>session_id : {newData.commitResponse.session_id}</p>
            <p>status : {newData.commitResponse.status}</p>
            <p>transaction_date : {newData.commitResponse.transaction_date}</p>
          </div>
        ) : (
          <p>Cargando datos de transacción...</p>
        )}
      </div>
    </Layout>
  );
};

export default TransactionComponent;
