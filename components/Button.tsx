import React, {ReactNode } from "react";
import styled, { css } from "styled-components";

export interface bProps {
  children: ReactNode;
  size?: string;
  primary?: boolean;
  white?: boolean
  outline?: boolean;
  block?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonStyle = css <bProps>`
border: none;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items: center;
text-decoration: none;
svg{
  height: 16px;
}
${(props) => props.white && !props.outline && css`
background-color: #fff;
color: black;
`};
${(props) => props.white && props.outline && css`
background-color: transparent;
color: white;
`};
${(props) =>
  props.primary && !props.outline &&
  css`
    background-color: #5542f6;
    color: white;
  `};
  ${(props) =>
    props.primary && props.outline &&
    css`
      background-color: transparent;
      border:1px solid #5542f6;
      color: #5542f6;
    `};
${(props) =>
  props.size === "l" &&
  css`
  font-size = 1.2rem;
  padding:10px 20px
  svg{
    height: 20px;
  }
  `};

  ${(props) =>
    props.block && css`
    display: block;
    width: 100%;
    `
  }
`;

const StlyedBtn = styled.button<bProps>`
  ${ButtonStyle};
  `;
const Button: React.FC<bProps> = (props) => {
  return <StlyedBtn {...props} >{props.children}</StlyedBtn>;
  
};

export default Button;
