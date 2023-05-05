import styled from "styled-components"
import { useState } from "react";

const Image = styled.img`
    max-width: 100%;
    border-radius: 10px;
`;
const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px
`;
const ImageButton = styled.div<any>`
    cursor: pointer;
    border: 1px solid #aaa;
    margin-top: 5px;
    border-radius: 10px;
    ${(props) => (props.active? `border-color:#aaa;`: `border:transparent; opacity: 0.6;`)};
`;
export default function ProductImages({images}:{images:any}){
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return(
        <>
        <Image src={activeImage} alt="" />
        <ImageButtons>
            {images.map((image:any)=>(
                <ImageButton key={image} active={image===activeImage}onClick={() => setActiveImage(image)}>
                    <Image src={image} alt="" />
                </ImageButton>
            ))}
        </ImageButtons>
        </>
    )
}