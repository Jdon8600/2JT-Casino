import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import { IProduct } from "@/interfaces/Product";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext} from "react";
import { CartContext } from "./CartContext";


const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8 rem;
`;
const Wapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px ;
  img {
    max-width: 100%;
    max-height: 200px;
    diplay: block;
    margin: 0 auto;
  }
  div:nth-child(1){
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    img {
      max-width: 150%;
    }
    div:nth-child(1){
      order: 0;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25x;
  
`;
export default function Featured({product}: {product: IProduct}) {
  const {setCartProducts} = useContext(CartContext);
  return (
    <Bg>
      <Center>
        <Wapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>
                {product.description}
              </Desc>
              <ButtonWrapper>
                <ButtonLink href={'/product/'+product._id} outline={1} white={1} size="l">
                  read more...
                </ButtonLink >
                <Button primary onClick={() => setCartProducts((prev: any) => [...prev, product._id])} size="l">
                  <CartIcon/>
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://2jt-ecommerce.s3.amazonaws.com/4256.png" alt="" />
          </Column>
        </Wapper>
      </Center>
    </Bg>
  );
}
