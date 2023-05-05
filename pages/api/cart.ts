import { IProduct } from "@/interfaces/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    products: IProduct[]
}

export default async function handle(req: NextApiRequest, res: NextApiResponse<Data> ) {
    await mongooseConnect();
    const ids = req.body?.ids;
    const products: IProduct[] = await Product.find({_id: ids})
    res.json({products: products});
}