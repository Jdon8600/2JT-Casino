import { IProduct } from "@/interfaces/Product";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0px 20px;
`;

export default function NewProducts({ products }: { products: [IProduct] }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products.length > 0 &&
          products.map((product) => <ProductBox key={product.title} products={product} />)}
      </ProductGrid>
    </Center>
  );
}
