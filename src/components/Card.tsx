import React from "react";
import styled from "styled-components";
import { COLOR, FONT } from "@src/theme";

const CardLink = styled.a`
    height: 100%;
`;

const CardContainer = styled.div<{ listView: boolean }>`
    background: ${COLOR.white};
    height: ${props => props.listView ? "100px" : "100%"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: ${props => props.listView ? "flex" : "block"};
    margin: ${props => props.listView ? "1rem 0" : "0"};

    p {
      color: ${COLOR.darkGray};
      font-size: 16px;
      line-height: 1.5;
      margin-top: .7rem;
    }
  `

const ImgContainer = styled.div<{ listView: boolean }>`
    background: ${COLOR.black};
    overflow: hidden;
    background: black;
    height: ${props => props.listView ? "auto" : "200px"};
    max-width: ${props => props.listView ? "120px" : "100%"};
    min-width: ${props => props.listView ? "120px" : "100%"};
    margin: 0;
`

const Img = styled.img`
    object-fit: cover;
    min-width: 100%;
    height: 100%;
    margin: 0 0 -1rem 0;
    opacity: 0.9;
    /* margin: 0 0 -1rem 0;
    height: 200px; */
    /* position: relative; */
`

const TextContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
`

const Name = styled.h3`
    /* font: normal 700 19px/1.2 ${FONT.serif};
    letter-spacing: 1.2px; */
    color: ${COLOR.darkGray};

`

const Tags = styled.div`
    margin: 1rem 0 0 0;
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
    width: 100%;
    display: flex;
    justify-content: flex-end;

    img {
        width: 15px;
        margin: 5px;
    }
`

const DataRow = styled.div<{ listView: boolean }>`
    align-self: flex-end;
    position: ${props => props.listView ? "relative" : "absolute"};
    margin: ${props => props.listView ? "0" : " -2rem 0 0 0"}
    color: ${COLOR.darkGray};
    /* margin: -2rem 0 0 0; */
}
    div {
        display: flex;
        flex-direction: row;
        border-radius: 10px;
        background: rgb(242, 242, 242);
        z-index: 1;
    }
`

const Price = styled.h5`
    margin: .5rem;
`

const Rating = styled.h5`
    margin: .5rem;
`

const Distance = styled.h5`
    margin: .5rem;
`

class Card extends React.Component<{
  imgUrl: string;
  price: string;
  name: string;
  rating: number;
  distance: number;
  listView: boolean;
  description: string;
}>{
  render() {
    const { imgUrl, price, name, rating, distance, listView, description } = this.props
    return (
      <CardLink href="/">
        <CardContainer listView={listView}>
          <ImgContainer listView={listView}>
            <Img src={imgUrl} alt={name} />
          </ImgContainer>
          <TextContainer>
            <Name>{name}</Name>
            <DataRow listView={listView}>
              <div>
                <Price>{price}</Price>
                <Rating>{rating}</Rating>
                <Distance>{distance} mins</Distance>
              </div>
            </DataRow>
            {/* <Tags>
              <Tag>Tags</Tag>
              <Tag>Tags</Tag>
              <Tag>Tags</Tag>
            </Tags> */}
            <p>{description}</p>
            <Icons>
              <img src="../img/burger.png" alt="" />
              <img src="../img/burger.png" alt="" />
              <img src="../img/burger.png" alt="" />
            </Icons>
          </TextContainer>
        </CardContainer >
      </CardLink >
    )
  }
}

export default Card;
