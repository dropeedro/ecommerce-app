import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import stripe from 'stripe'

const stripeKey = stripe(process.env.STRIPE_KEY)
const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
    // let images = req.body.images
    const line_items = req.body.cartItems.map((p) => {
      return {
        price_data: {
          currency: 'clp',
          product_data: {
            name: p.name,
            // image: images[i],
            description: p.description,
            metadata : {
              id : p._id
            }
          },
          unit_amount: p.price,
        },
        quantity: p.quantityItem,
      }
    })

    const session = await stripeKey.checkout.sessions.create({
      // shipping_address_collection: {
      //   allowed_countries: ['CL','AR','PE'],
      // },
      // shipping_options: [
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount: {
      //         amount: 0,
      //         currency: 'clp',
      //       },
      //       display_name: 'Retiro en tienda',
      //       delivery_estimate: {
      //         minimum: {
      //           unit: 'business_day',
      //           value: 1,
      //         },
      //         maximum: {
      //           unit: 'business_day',
      //           value: 2,
      //         },
      //       },
      //     },
      //   },
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount: {
      //         amount: 5000,
      //         currency: 'clp',
      //       },
      //       display_name: 'Despacho a domicilio',
      //       delivery_estimate: {
      //         minimum: {
      //           unit: 'business_day',
      //           value: 3,
      //         },
      //         maximum: {
      //           unit: 'business_day',
      //           value: 5,
      //         },
      //       },
      //     },
      //   },
      // ],
      // phone_number_collection:  {
      //   enabled: true,
      // },
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });
  
    res.send({url: session.url});
  });

  export default router

