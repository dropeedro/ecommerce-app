import React, { useState, useEffect } from 'react'
import './PayButton.scss'
import axios from 'axios';

const PayButton = ({cartItems, subTotal}) => {
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    const createTransaction = async () => {
      try {
       
        const {data} = await axios.get(`${process.env.REACT_APP_API}/webpay_plus/create`)
        // console.log(response);
        // console.log(response?.data);
        console.log(data);

        if (!data) {
          throw new Error('Error al crear la transacción');
        }
        setTimeout(() => {
            
            setViewData(data);
        }, 2000);

      } catch (error) {
        console.log(error);
      }
    };

    createTransaction();
  }, [subTotal]);


  // Utiliza los valores de viewData en tu componente de React
  console.log(viewData);
  if(!viewData){
    console.log('no hay nada');
    return <div className="div"></div>
  }else{
  const { token, url } = viewData;
    console.log(token);
    console.log(url);

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
    {/* <form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST"> */}
        {/* <input type="hidden" name="token_ws" value="01ab0de6c9783556107374d5156c57ec5f31460daf40c8f09ab5bd69d113b47d"/> */}
        {/* <div className='pay-button' value="Ir a pagar">Ir a pagar</div> */}
    {/* </form> */}
    <form action={url} method="POST">
        <input type="hidden" name="token_ws" value={token}/>
        <input type="submit" className='pay-button' value="Ir a Pagar"/>
    </form>
    </>
  ) 
}
}

export default PayButton