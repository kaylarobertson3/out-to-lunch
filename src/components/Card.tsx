import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT, FONT } from "@src/theme";
import starIcon from "@public/assets/icons/star.svg";
import walkIcon from "@public/assets/icons/walk.svg";

const CardLink = styled.a`
  height: 100%;
`;

const CardContainer = styled.div<{ listView: boolean }>`
  display: flex;
  flex-direction: ${props => (props.listView ? "row" : "column")};
  height: ${props => (props.listView ? "100px" : "100%")};
  margin: ${props => (props.listView ? "1rem 0" : "0")};
  border-radius: ${props =>
    props.listView ? "0 10px 10px 0" : "0 0 10px 10px"};
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08);

  p {
    color: ${COLOR.darkGray};
    font-size: 16px;
    line-height: 1.5;
    margin-top: 0.7rem;
  }

  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const ImgContainer = styled.div<{ listView: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${COLOR.white};
  border-radius: 10px;
  overflow: hidden;
  justify-content: ${props => (props.listView ? "flex-end" : "flex-start")};
  height: ${props => (props.listView ? "100px" : "140px")};
  width: ${props => (props.listView ? "30%" : "100%")};
  border-radius: ${props =>
    props.listView ? "10px 0 0 10px" : "10px 10px 0 0"};
  margin: 0;
`;

const Img = styled.img`
  object-fit: cover;
  min-width: 100%;
  max-height: 100%;
  margin: 0 0 0 0;
  opacity: 0.9;
`;

const TextContainer = styled.div<{ listView: boolean }>`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  background: ${COLOR.white};
  color: ${COLOR.darkGray};
  border-radius: ${props =>
    props.listView ? "0px 10px 10px 0" : "0 0 10px 10px"};
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.h3`
  color: ${COLOR.darkGray};
  margin-right: 1rem;
  line-height: 1.2;

  ${BREAKPOINT.m`
      height: 40px;
  `};
`;

const Price = styled.h4`
  color: ${COLOR.darkGray};
  font-size: 0.9rem;
  font-weight: 300;
`;

const Row = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.h5`
  margin-right: 0.5rem;
  font-weight: 400;
  opacity: 1;
  background: rgba(128, 128, 128, 0.1);
  padding: 5px 8px;
  border-radius: 5px;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  img {
    width: 15px;
    margin: 5px;
  }
`;

const Distance = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
  }
`;

const Details = styled.div<{ listView: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  position: absolute;
  margin: ${props => (props.listView ? "0" : " -.8rem 0 0 .3rem")};
  border-radius: 9px;
  background: ${COLOR.white};
  z-index: 1;
  padding: 8px 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);

  img {
    height: 15px;
    margin-right: 0.5rem;
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

class Card extends React.Component<{
  imgUrl: string;
  price: number;
  name: string;
  rating: number;
  distance: number;
  listView: boolean;
  description: string;
  tags?: any;
  lat: number;
  long: number;
  handleCardClick: any;
}> {
  render() {
    const {
      imgUrl,
      price,
      name,
      rating,
      distance,
      listView,
      tags,
      lat,
      long
    } = this.props;

    const priceText = () => {
      if (price == 1) {
        return "$";
      } else if (price == 2) {
        return "$$";
      } else if (price == 3) {
        return "$$$";
      } else return "?";
    };

    return (
      <CardLink
        onClick={e => {
          this.props.handleCardClick(lat, long);
        }}
      >
        <CardContainer listView={listView}>
          <ImgContainer listView={listView}>
            <Img src={imgUrl} alt={name} />
            <Details listView={listView}>
              <Rating>
                <img src={starIcon} alt="rating" />
                <h5>{rating}</h5>
              </Rating>
              <Distance>
                <img height="15px" src={walkIcon} alt="walking distance" />
                <h5>{distance} min.</h5>
              </Distance>
            </Details>
          </ImgContainer>
          <TextContainer listView={listView}>
            <NameWrapper>
              <Name>{name}</Name>
              <Price>{priceText()}</Price>
            </NameWrapper>
            <Row>
              <Tags>
                {tags && tags[0] && <Tag>{tags[0]}</Tag>}
                {tags && tags[1] && <Tag>{tags[1]}</Tag>}
              </Tags>
            </Row>
          </TextContainer>
        </CardContainer>
      </CardLink>
    );
  }
}

export default Card;
