import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@/models/Order";
import {buffer} from "micro"
const sk = process.env.STRIPE_SK
const stripe = require('stripe')(sk);
const endpointSecret = "whsec_2bab441cd06ebedc72c93561990e2f7c1a208d704cd9a6a8a1d9ba7a93a7aff4";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err:any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata.orderId
        const paid = data.payment_status === 'paid';
        if(orderId && paid){
            await Order.findByIdAndUpdate(orderId, {paid: paid});
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
}

export const config ={
    api: {
        bodyParser: false
    }
}
//unreal-laud-boom-edify
//acct_1N3jwuEXMu0UnD5R
//whsec_2bab441cd06ebedc72c93561990e2f7c1a208d704cd9a6a8a1d9ba7a93a7aff4