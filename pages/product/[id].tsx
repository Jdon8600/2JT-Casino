import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { IProduct } from "@/interfaces/Product";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const Title = styled.h1`
  font-size: 1.5rem;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;
const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }: { product: IProduct }) {
  const {setCartProducts} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <div>
                <Button primary onClick={()=> setCartProducts((prev: any) => [...prev, product._id])}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const id = context.params.id;
  const product = await Product.findOne({ _id: id });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
