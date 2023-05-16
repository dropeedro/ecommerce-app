import React, { useState, useEffect } from 'react'
import './PayButton.scss'
import axios from 'axios';
import SpinnerButton from '../../SpinnerButton';

const PayButton = ({cartItems, subTotal}) => {
  const [viewData, setViewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState(10)

  useEffect(() => {
    setAmount(subTotal);
    setIsLoading(false);
  }, [subTotal]);

  useEffect(() => {
    const createTransaction = async () => {
      console.log(amount);
      if(amount === 0 || amount  === undefined){
        return;
      }
      try {
            const {data} =await axios.get(`${process.env.REACT_APP_API}/webpay_plus/create?subTotal=${amount}`)
            console.log(data);
            setViewData(data);
            setIsLoading(false)

      } catch (error) {
        console.log(error);
        setError('Error al crear la transacción');
        setIsLoading(false)
      }
    };

    createTransaction();
  }, [amount]);

  if(isLoading){
    return <div className="pay-button"><SpinnerButton/></div>
  }

  if(error){
    return <div className='pay-button'>Error : {error}</div>
  }
  const token = viewData?.token || '';
  const url = viewData?.url || '';
    
  //STRAPI INTEGRATION
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

export default PayButton