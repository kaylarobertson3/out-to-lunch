import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { COLOR, BREAKPOINT } from "@src/theme";
import MapContainer from "@components/MapContainer";

const CardSectionWrapper = styled.section`
  max-width: 100vw;
`;

const MenuBar = styled.div<{ showMap: boolean }>`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${props => (props.showMap ? "flex-start" : "center")};
  margin-bottom: 2rem;
  background: ${COLOR.gray};
  z-index: 300;

  ${BREAKPOINT.m`
  flex-direction: ${props => (props.showMap ? "column" : "row")};
  `};
`;
const MenuLeft = styled.div``;

const MenuRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewBtn = styled.button`
  background: none;
  margin-right: 1rem;
  display: flex;
  padding: 0;
  align-items: center;

  img {
    margin-left: 0;
    width: 15px;

    ${BREAKPOINT.m`
        margin-left: 1rem;
      `};
  }

  span {
    display: none;
    ${BREAKPOINT.m`
        display: block;
      `};
  }
`;

const SortBtn = styled.select`
  display: flex;
  align-items: center;
  color: ${COLOR.black};
  background: none;
  margin: 0 0 0 1rem;
  font: normal 300 16px/23px "Karla", sans-serif;

  img {
    margin-left: 1rem;
  }
`;

const CardWrapper = styled.div<{ showMap: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: scroll;
  width: 100%;

  ${BREAKPOINT.m`
    margin-right: ${props => (props.showMap ? "1" : "0")};
  `};
`;

const Cards = styled.div<{ listView: boolean }>`
  display: ${props => (props.listView ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: 40px 30px;
  align-items: stretch;
  width: 100%;

  ${BREAKPOINT.m`
      grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
    `};
`;

const ResultsTextContainer = styled.h4`
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  ${BREAKPOINT.m`
    margin.bottomm: 0;
  `};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  ${BREAKPOINT.m`
      max-height: 800px;
      flex-direction: row-reverse;
  `};
`;

class CardSection extends React.Component<
  {
    cardData: any;
    updateSortParams: any;
    resultsText: string;
    query: any;
  },
  {
    listView: boolean;
    showMap: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      showMap: true
    };
  }

  componentDidMount = () => {
    if (window.innerWidth <= 700) {
      this.setState({
        showMap: false
      });
    }
  };

  toggleListView = e => {
    e.preventDefault();
    this.setState({
      listView: !this.state.listView
    });
  };

  toggleMapView = e => {
    e.preventDefault();
    this.setState({
      showMap: !this.state.showMap
    });
  };

  render() {
    const { cardData, updateSortParams, resultsText } = this.props;
    const viewText = this.state.listView ? "Grid View" : "List View";
    const mapText = this.state.showMap ? "Hide map" : "View map";

    const getImgUrl = d => {
      var imgUrl;
      if (d.imgUrl && d.imgUrl.length > 1) {
        imgUrl = d.imgUrl;
      } else if (d.cuisine) {
        const lowerCuisine = d.cuisine.toLowerCase();
        imgUrl = `../cards/placeholders/${lowerCuisine}.jpg`;
      }
      return imgUrl;
    };

    return (
      <CardSectionWrapper>
        <Wrapper>
          {this.state.showMap && <MapContainer cardData={cardData} />}
          <CardWrapper showMap={this.state.showMap}>
            <MenuBar showMap={this.state.showMap}>
              <MenuLeft>
                {resultsText && (
                  <ResultsTextContainer>{resultsText}</ResultsTextContainer>
                )}
              </MenuLeft>
              <MenuRight>
                <ViewBtn onClick={this.toggleMapView}>
                  <span>{mapText}</span>
                  <img src="../img/icons/group.png" alt="map view" />
                </ViewBtn>
                <ViewBtn onClick={this.toggleListView}>
                  <span>{viewText}</span>
                  {this.state.listView ? (
                    <img src="../img/icons/group.png" alt="card view" />
                  ) : (
                    <img src="../img/icons/list.png" alt="list view" />
                  )}
                </ViewBtn>

                <label htmlFor="sort">Sort: </label>
                <SortBtn
                  name="sort"
                  onChange={e => {
                    updateSortParams(e.target.value);
                  }}
                >
                  <option value={"rating"}>highest rated</option>
                  <option value={"distance"}>closest</option>
                  <option value={"a-z"}>A-Z</option>
                  <img src="../img/icons/arrow.png" alt="" />
                </SortBtn>
              </MenuRight>
            </MenuBar>
            <Cards id="cards" listView={this.state.listView}>
              {cardData.length == 0 && (
                <ResultsTextContainer>sorry, no results</ResultsTextContainer>
              )}
              {typeof cardData.length == "undefined" && (
                <Card
                  listView={this.state.listView}
                  name={cardData.name}
                  imgUrl={`../img/cards/${getImgUrl(cardData)}`}
                  price={cardData.price}
                  rating={cardData.rating}
                  distance={cardData.distance}
                  description={cardData.description}
                  tags={[
                    cardData.cuisine1,
                    cardData.cuisine2,
                    cardData.cuisine3
                  ]}
                />
              )}

              {cardData.length >= 1 &&
                cardData.map((d, i) => {
                  return (
                    <Card
                      listView={this.state.listView}
                      key={i}
                      name={d.name}
                      imgUrl={`../img/cards/${getImgUrl(d)}`}
                      price={d.price}
                      rating={d.rating}
                      distance={d.distance}
                      description={d.description}
                      tags={[d.cuisine, d.cuisine2, d.cuisine3]}
                    />
                  );
                })}
            </Cards>
          </CardWrapper>
        </Wrapper>
      </CardSectionWrapper>
    );
  }
}

export default CardSection;
