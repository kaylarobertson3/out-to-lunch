import React from "react";
import styled from "styled-components";
import { COLOR, FONT } from "@src/theme";
import starIcon from "@src/icons/star.svg";
import walkIcon from "@src/icons/walk.svg";

const CardLink = styled.a`
  height: 100%;
`;

const CardContainer = styled.div<{ listView: boolean }>`
  flex-direction: column;
    /* background: ${props => (props.listView ? `${COLOR.white}` : "none")}; */
    height: ${props => (props.listView ? "100px" : "100%")};
    display: flex;
    margin: ${props => (props.listView ? "1rem 0" : "0")};
    border-radius: ${props =>
      props.listView ? "0 10px 10px 0" : "0 0 10px 10px"};
    
    p {
      color: ${COLOR.darkGray};
      font-size: 16px;
      line-height: 1.5;
      margin-top: .7rem;
    }
  `;

const ImgContainer = styled.div<{ listView: boolean }>`
  background: ${COLOR.black};
  border-radius: 10px;
  overflow: hidden;
  background: black;
  height: ${props => (props.listView ? "auto" : "200px")};
  width: ${props => (props.listView ? "30%" : "100%")};
  border-radius: ${props =>
    props.listView ? "10px 0 0 10px" : "10px 10px 0 0"};
  margin: 0;
`;

const Img = styled.img`
  object-fit: cover;
  min-width: 100%;
  height: 100%;
  margin: 0 0 0 0;
  opacity: 0.9;
`;

const DataRow = styled.div<{ listView: boolean }>`
  align-self: flex-end;
  position: ${props => (props.listView ? "relative" : "absolute")};
  margin: ${props => (props.listView ? "0" : " 0rem 0 0 0")};
  color: ${COLOR.darkGray};
  z-index: 1;

  /* div {
    display: flex;
    flex-direction: row;
    border-radius: 9px;
    background: rgb(242, 242, 242);
    z-index: 1;
  } */
`;

const TextContainer = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  background: ${COLOR.white};
  color: ${COLOR.darkGray};
  border-radius: 0 0 10px 10px;
`;

const Name = styled.h3`
  color: ${COLOR.darkGray};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Tags = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.h5`
  margin-right: 0.5rem;
  font-weight: 400;
  opacity: 0.6;
  font-size: 13px;
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

const Rating = styled.h5`
  margin: 1rem 1rem 0 0;
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
  }
`;

//TODO: fix div wrapper, style for distance
const Distance = styled.h5`
  display: flex;
  border-radius: 9px;
  background: rgb(242, 242, 242);
  z-index: 1;
  padding: 8px 10px;
  display: flex;
  align-items: center;

  img {
    height: 15px;
    margin-right: 0.5rem;
  }
`;

class CardAlt extends React.Component<{
  imgUrl: string;
  price: string;
  name: string;
  rating: number;
  distance: number;
  listView: boolean;
  description: string;
}> {
  render() {
    const {
      imgUrl,
      price,
      name,
      rating,
      distance,
      listView,
      description
    } = this.props;
    return (
      <CardLink>
        <CardContainer listView={listView}>
          <DataRow listView={listView}>
            <div>
              {/* <Rating>{price}</Rating> */}
              <Distance>
                <img height="15px" src={walkIcon} alt="walking distance" />
                {distance} min.
              </Distance>
            </div>
          </DataRow>
          <ImgContainer listView={listView}>
            <Img src={imgUrl} alt={name} />
          </ImgContainer>
          <TextContainer>
            <Name>{name}</Name>
            <Row>
              <Rating>
                <img src={starIcon} alt="rating" />
                {rating}
              </Rating>
              <Tags>
                <Tag>Tags</Tag>
                <Tag>Tags</Tag>
                <Tag>Tags</Tag>
              </Tags>
            </Row>
            {/* {detailView && <p>{description}</p>} */}
            {/* <Icons>
              <img src="../img/icons/search.png" alt="searcg" />
              <img src="../img/icons/search.png" alt="search" />
              <img src="../img/icons/search.png" alt="search" />
            </Icons> */}
          </TextContainer>
        </CardContainer>
      </CardLink>
    );
  }
}

export default CardAlt;
