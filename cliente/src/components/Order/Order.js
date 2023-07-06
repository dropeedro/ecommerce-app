import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout';

const OrderConfirmation = () => {
    const location = useLocation();
    const [token, setToken] = useState('');
    const [commitResponse, setCommitResponse] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setToken(searchParams.get('token'));
    
        const encodedCommitResponse = searchParams.get('commitResponse');
        const decodedCommitResponse = decodeURIComponent(encodedCommitResponse);
        setCommitResponse(JSON.parse(decodedCommitResponse));
      }, [location.search]);

    console.log(commitResponse);

  return (
    <Layout>
    <div>
      {token && (
        <div>
            <h1>Confirmación de Orden</h1>
            {token && (
            <div>
                <h2>Detalles de la orden:</h2>
                <p>Token: {token}</p>
                <div>
                <h3>vci</h3>
                <p>{commitResponse.vci}</p>
                </div>
                <div>
                <h3>amount</h3>
                <p>{commitResponse.amount}</p>
                </div>
                <div>
                <h3>status</h3>
                <p>{commitResponse.status}</p>
                </div>
                <div>
                <h3>buy_order</h3>
                <p>{commitResponse.buy_order}</p>
                </div>
                <div>
                <h3>session_id</h3>
                <p>{commitResponse.session_id}</p>
                </div>
                <div>
                <h3>card_number</h3>
                <p>{commitResponse.card_detail?.card_number}</p>
                </div>
                <div>
                <h3>accounting_date</h3>
                <p>{commitResponse.accounting_date}</p>
                </div>
                <div>
                <h3>transaction_date</h3>
                <p>{commitResponse.transaction_date}</p>
                </div>
                <div>
                <h3>authorization_code</h3>
                <p>{commitResponse.authorization_code}</p>
                </div>
                <div>
                <h3>payment_type_code</h3>
                <p>{commitResponse.payment_type_code}</p>
                </div>
                <div>
                <h3>response_code</h3>
                <p>{commitResponse.response_code}</p>
                </div>
                <div>
                <h3>installments_number</h3>
                <p>{commitResponse.installments_number}</p>
                </div>
            </div>
            )}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default OrderConfirmation;