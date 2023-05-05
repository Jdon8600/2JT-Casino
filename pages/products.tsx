import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { IProduct } from "@/interfaces/Product";
import ProductBox from "@/components/ProductBox";
import { ProductGrid } from "@/components/NewProducts";

const Title = styled.h1`
  font-size: 1.5rem;
`;


export default function ProductsPage({ products }: { products: [IProduct] }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductGrid>
        {products.length > 0 &&
          products.map((product) => <ProductBox key={product.title} products={product} />)}
      </ProductGrid>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
