import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { ObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
const sk = process.env.STRIPE_SK
const stripe = require('stripe')(sk);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  await mongooseConnect();
  const { name, email, city, state, zip, address, country, cartProducts } =
    req.body;
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      productIds.filter((id: ObjectId) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items, name, email, city, state, zip, address, country, paid:false,
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL +'/cart?success=1',
    cancel_url: process.env.PUBLIC_URL +'/cart?cancel=1',
    metadata:{
        orderId: orderDoc._id.toString()
    },
  })
  res.json({
    url: session.url
  })
}
