import React from 'react';
import Link, {LinkProps} from "next/link";
import styled from 'styled-components'
import { ButtonStyle } from './Button';
import { bProps } from './Button';

const StyledLink = styled(Link)<bProps>`
   ${ButtonStyle};
`;
const ButtonLink: React.FC<any>= (props) => {
   return (
      <StyledLink {...props}/>
   );
};

export default ButtonLink;