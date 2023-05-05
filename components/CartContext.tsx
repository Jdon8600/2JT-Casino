import { ObjectId } from "mongoose";
import { ReactNode, createContext, useEffect, useState } from "react";

export type TCartContext = {
    cartProducts: [],
    setCartProducts: (c: any) => void,
}

export const CartContext = createContext<TCartContext>({
    cartProducts: [],
    setCartProducts: () => {},
})

export function CartContextProvider({children}: {children:ReactNode}){
    const ls = (typeof window !== 'undefined') ? window.localStorage : null;
    const item = ls?.getItem('cart')
    const [cartProducts, setCartProducts] = useState<[]>([]);
    useEffect(()=>{
        if(cartProducts?.length > 0){
            ls?.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    useEffect(() => {
        if(ls && item){
            setCartProducts(JSON.parse(item))
        }
    }, [])
    return(
        <CartContext.Provider value={{cartProducts, setCartProducts}}>
            {children}
        </CartContext.Provider>
    );
}