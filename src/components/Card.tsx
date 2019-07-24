import React from "react";
import styled from "styled-components";
import { COLOR } from "../theme";

const CardLink = styled.a`

`;

const CardContainer = styled.div`
    background: ${COLOR.white};
    margin: 1rem 0 2rem 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    :hover img {
        opacity: 1;
        transform: scale(1.1);
    }  
    `

const ImgContainer = styled.div`
    background: ${COLOR.black};
    overflow: hidden;
    background: black;
    height: 200px;

`

const Img = styled.img`
    margin: 0 0 -1rem 0;
    object-fit: cover;
    min-height: 100%;
    width: 100%;
    opacity: 0.9;
    transition: all 0.2s ease;
`

const TextContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Name = styled.h3`

`

const Tags = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Tag = styled.h5`
    background: ${COLOR.lightGray};
    margin-right: .5rem;
    padding: .4rem .7rem;
    border-radius: 10px;
`

const Icons = styled.div`
    img {
        width: 15px;
        margin: 5px;
    }
`

const DataRow = styled.div`
    display: flex;
    flex-direction: row;
    background: ${COLOR.lightGray};
    border-radius: 10px;
`

const Price = styled.h5`
    margin: .5rem;
`

const Rating = styled.h5`
    margin: .5rem;    
`

class Card extends React.Component<{
    imgUrl: string;
    price: string;
    name: string;
    rating: number;
}>{
    render() {
        const { imgUrl, price, name, rating } = this.props
        return (
            <CardLink href="/">
                <CardContainer>
                    <ImgContainer>
                        <Img src={imgUrl} alt={name} />
                    </ImgContainer>
                    <TextContainer>
                        <Name>{name}</Name>
                        <Tags>
                            <Tag>Tags</Tag>
                            <Tag>Tags</Tag>
                            <Tag>Tags</Tag>
                        </Tags>
                        <Icons>
                            <Img src="../img/burger.png" alt="" />
                            <Img src="../img/burger.png" alt="" />
                            <Img src="../img/burger.png" alt="" />
                        </Icons>
                        <DataRow>
                            <Price>{price}</Price>
                            <Rating>{rating}</Rating>
                        </DataRow>
                    </TextContainer>
                </CardContainer >
            </CardLink>
        )
    }
}

export default Card;