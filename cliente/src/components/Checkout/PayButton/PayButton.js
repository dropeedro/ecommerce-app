import React, { useState, useEffect } from 'react'
import './PayButton.scss'
import axios from 'axios';
import SpinnerButton from '../../SpinnerButton';

const PayButton = ({cartItems, subTotal}) => {
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
    const createTransaction = async () => {
      try {
        if(subTotal !== 0) {
            const {data} =await axios.get(`${process.env.REACT_APP_API}/webpay_plus/create?subTotal=${subTotal}`)
            console.log(data);

            if (!data) {
              throw new Error('Error al crear la transacción');
            }
            setTimeout(() => {
                setViewData(data);
            }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    createTransaction();
  }, 2000);
  }, [subTotal]);

  
  // Utiliza los valores de viewData en tu componente de React
  console.log(viewData);
  if(!viewData){
    return <div className="pay-button"><SpinnerButton/></div>
  }else{
    const { token, url } = viewData;
    
    // const handleCheckOut = () =>{
    //     const url = `${process.env.REACT_APP_API}`
    //     // let images =  []
    //     // for (let i = 0; i < cartItems.length; i++) {
    //     //     let img = axios.get(`/api/v1/products/product-photo/${cartItems[i]._id}`)
    //     //     images.push(img)
    //     // }
    //     axios.post(`${url}/api/v1/stripe/create-checkout-session`, {
    //         cartItems,
    //         userId : auth?.user.id,
    //     }).then((res) => {
    //         if(res.data.url){
    //             window.location.href = res.data.url
    //         }
    //     }).catch((error) => console.log(error.message))
    // }

  return (
    // <div className='pay-button' onClick={handleCheckOut}>Ir a pagar</div>
    <>
    <form action={url} method="POST">
        <input type="hidden" name="token_ws" value={token}/>
        <button type="submit" className='pay-button'>Ir a pagar</button>
    </form>
    </>
  ) 
}

}

export default PayButton