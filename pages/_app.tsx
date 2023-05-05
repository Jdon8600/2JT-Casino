import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      </CartContextProvider>
    </>
  );
}
