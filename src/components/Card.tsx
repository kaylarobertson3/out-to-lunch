import React from "react";
import styled from "styled-components";
import { COLOR } from "../theme";

const Card = styled.div`
    background: ${COLOR.white};
    margin: 1rem 0 2rem 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);`

const ImgContainer = styled.div`
    background: ${COLOR.black};
`

const TextContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Img = styled.img`
    max-width: 100%;
    opacity: 0;
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



export default () => (
    <Card>
        <ImgContainer>
            <Img src="../img/burger.png" alt="" />
        </ImgContainer>
        <TextContainer>
            <Name>Heno Heno</Name>
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
                <Price>$$$</Price>
                <Rating>4.9</Rating>
            </DataRow>
        </TextContainer>
    </Card>
);