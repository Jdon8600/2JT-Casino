import { ObjectId } from "mongoose";

export type IProduct = {
    title: string;
    description: string;
    price: number;
    images: object[];
    category: any;
    _id: ObjectId
}