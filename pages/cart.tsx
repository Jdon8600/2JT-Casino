import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "@/interfaces/Product";
import Table from "@/components/Table";
import { ObjectId } from "mongoose";
import Input from "@/components/Input";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  img {
    max-width: 75px;
    max-height: 75px;
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border-radius: 10px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
  
`;
const QuantityLable = styled.span`
  padding: 0 3px;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 3px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", {
          ids: cartProducts,
        })
        .then((res) => {
          const { products } = res.data;
          setProducts(products);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if(typeof window === "undefined") {
        return;
    }
    if (window?.location.href.includes("success")) {
        setIsSuccess(true);
        setCartProducts([]);
    }
  }, [])
  


  function addProducts(id: ObjectId) {
    setCartProducts((prev: any) => [...prev, id]);
  }

  function removeProduct(id: ObjectId) {
    setCartProducts((prev: any) => {
      const pos = prev.indexOf(id);
      if (pos > -1) {
        return prev.filter((value: any, index: number) => index !== pos);
      }
      return prev;
    });
  }
  async function goToPayment() {
    const response = await axios.post("api/checkout", {
      name,
      email,
      address,
      city,
      state,
      zip,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price =
      products.find((product: IProduct) => product._id === productId)?.price ||
      0;
    total += price;
  }
  console.log(cartProducts);

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnWrapper>
            <Box>
              <h1>Thanks for shopping with us!</h1>
              <p>
                We will email tracking information once your order has been
                shipped
              </p>
            </Box>
          </ColumnWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.title}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img
                            src={product.images[0].toString()}
                            alt={product.title}
                          />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => addProducts(product._id)}>
                          +
                        </Button>
                        <QuantityLable>
                          {
                            cartProducts.filter((id:any) => id === product._id)
                              .length
                          }
                        </QuantityLable>
                        <Button onClick={() => removeProduct(product._id)}>
                          -
                        </Button>
                      </td>
                      <td>
                        $
                        {product.price *
                          cartProducts.filter((id:any) => id === product._id)
                            .length}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2> order information </h2>

              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Street Address"
                value={address}
                name="address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="State"
                  value={state}
                  name="state"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState(e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Zip"
                  value={zip}
                  name="zip"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setZip(e.target.value)
                  }
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCountry(e.target.value)
                }
              />
              <Button block primary onClick={goToPayment}>
                continue to payment
              </Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
