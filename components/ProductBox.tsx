import styled from "styled-components";
import React, { useContext } from "react";
import { IProduct } from "@/interfaces/Product";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  text-decoration: none;
  color: black;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ProductBox = ({ products }: { products: IProduct }) => {
  const url = "/product/" + products._id;
  const {setCartProducts} = useContext(CartContext);
  return (
    <ProductWrapper >
      <WhiteBox href={url}>
        <img src={products.images[0].toString()} alt="" />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{products.title}</Title>
        <PriceRow>
          <Price>${products.price}</Price>
          <Button primary outline onClick={() => setCartProducts((prev: any) => [...prev, products._id])}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
