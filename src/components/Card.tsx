import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";
import starIcon from "@public/assets/icons/star.svg";
import walkIcon from "@public/assets/icons/walk.svg";

const CardLink = styled.a`
  height: 100%;
`;

const CardContainer = styled.div`
  transition: all 300ms ease-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  border-radius: 0 0 10px 10px
    /* box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08); */ p {
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

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLOR.white};
  border-radius: 10px;
  overflow: hidden;
  justify-content: flex-start;
  height: 140px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  margin: 0;
  border: 1px solid ${COLOR.black};
  border-bottom: none;
`;

const Img = styled.img`
  object-fit: cover;
  min-width: 100%;
  max-height: 100%;
  margin: 0 0 0 0;
  opacity: 0.9;
`;

const TextContainer = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  background: ${COLOR.white};
  color: ${COLOR.darkGray};
  border-left: 1px solid ${COLOR.black};
  border-bottom: 1px solid ${COLOR.black};
  border-right: 1px solid ${COLOR.black};
  border-radius: 0 0 10px 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${BREAKPOINT.m`
      height: 40px;
  `};
`;

const Name = styled.h3`
  color: ${COLOR.darkGray};
  margin-right: 1rem;
  line-height: 1.2;
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

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  position: absolute;
  margin: -0.8rem 0 0 0.3rem;
  border-radius: 9px;
  background: ${COLOR.white};
  z-index: 1;
  padding: 8px 10px;
  border: 1px solid ${COLOR.black};

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

interface CardProps {
  imgUrl: string;
  price: number;
  name: string;
  rating: number;
  distance: number;
  description: string;
  tags?: string[];
  lat: number;
  long: number;
  handleCardClick: () => void;
}

const Card = ({ imgUrl, price, name, rating, distance, tags }: CardProps) => {
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
        this.props.handleCardClick();
      }}
    >
      <CardContainer>
        <ImgContainer>
          <Img src={imgUrl} alt={name} />
          <Details>
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
        <TextContainer>
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
};

export default Card;
