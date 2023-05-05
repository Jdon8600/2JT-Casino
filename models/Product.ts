import mongoose, {model, Schema, models} from "mongoose";
import { IProduct } from "@/interfaces/Product";


const ProductSchema = new Schema<IProduct>({
    title: {type:String, required: true},
    description: String,
    price: {type:Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
}, {collection:'Products', timestamps:true});

export const Product = models?.Product || model('Product', ProductSchema);