import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import NavIcon from "./icons/NavIcon";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const StlyedNav = styled.nav<any>`
  ${props => props.mobileNavActive ? `display: block;`: `display: none;`};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    align-items: center;
  }
`;
const NavLink = styled(Link)`
  color: #aaa;
  display: block;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0
  }
`;
const NextBtn = styled.button`
  display: block;
  text-align: center;
  font-size: 16px;
  color: #aaa;
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const StyledP = styled.p`
  display: block;
  color: #aaa;
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { data: session } = useSession();
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();
  async function logOut() {
    await router.push("/");
    await signOut();
  }
  return (
    <StyledHeader>
      <Center>
        <Wapper>
          <Logo href={"/"}>2JT Casino</Logo>
          <StlyedNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            {session ? <NavLink href={"/blackjack"}>BlackJack</NavLink> : null}
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
            {session ? <StyledP>{session?.user?.name}</StyledP> : null}
            {session ? (
              <NextBtn onClick={logOut}>Logout</NextBtn>
            ) : (
              <NextBtn onClick={() => signIn("google")}>Login</NextBtn>
            )}
          </StlyedNav>
          <NavButton onClick={()=> setMobileNavActive(prev => !prev)}>
            <NavIcon />
          </NavButton>
        </Wapper>
      </Center>
    </StyledHeader>
  );
}
