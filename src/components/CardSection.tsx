import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { COLOR, BREAKPOINT } from "@src/theme";
import MapContainer from "@components/MapContainer";
import ReactPaginate from "react-paginate";

const CardSectionWrapper = styled.section`
  max-width: 100vw;
`;

const MenuBar = styled.div<{ showMap: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  background: ${COLOR.gray};
  z-index: 300;

  ${BREAKPOINT.m`
  flex-direction: column;
  `};
`;

const MenuLower = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FloatLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FloatRight = styled.div``;

const ViewBtn = styled.button`
  background: none;
  display: flex;
  padding: 0 !important;
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
  /* overflow-y: scroll; */
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
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
  /* max-height: 800px; */

  ${BREAKPOINT.m`
      // max-height: 800px;
      flex-direction: row;
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

    const dataPartial = cardData.slice(0, 12);
    const viewText = this.state.listView ? "Grid View" : "List View";
    const mapText = this.state.showMap ? "Hide map" : "View map";

    const getImgUrl = d => {
      var imgUrl;
      if (d.imgUrl && d.imgUrl.length > 1) {
        console.log("d.imgUrl", d.imgUrl);
        imgUrl = `../../assets/img/cards/${d.imgUrl}`;
      } else if (d.cuisine) {
        const lowerCuisine = d.cuisine.toLowerCase();
        imgUrl = `../../assets/img/cards/placeholders/${lowerCuisine}.jpg`;
      }
      return imgUrl;
    };

    return (
      <CardSectionWrapper>
        <MenuBar showMap={this.state.showMap}>
          {resultsText && (
            <ResultsTextContainer>{resultsText}</ResultsTextContainer>
          )}
          <MenuLower>
            <FloatLeft>
              <ViewBtn
                onClick={this.toggleListView}
                style={{ marginRight: "1rem" }}
              >
                <span>{viewText}</span>
                {this.state.listView ? (
                  <img src="../../assets/icons/group.png" alt="card view" />
                ) : (
                  <img src="../../assets/icons/list.png" alt="list view" />
                )}
              </ViewBtn>

              {/* <label htmlFor="sort">Sort: </label> */}
              <SortBtn
                name="sort"
                onChange={e => {
                  updateSortParams(e.target.value);
                }}
              >
                <option value={"rating"}>Sort by: highest rated</option>
                <option value={"distance"}>Sort by: closest</option>
                <option value={"a-z"}>Sort: A-Z</option>
                <img src="../assetes/icons/arrow.png" alt="" />
              </SortBtn>
            </FloatLeft>
            <FloatRight>
              <ViewBtn onClick={this.toggleMapView}>
                <span>{mapText}</span>
                <img src="../assets/icons/group.png" alt="map view" />
              </ViewBtn>
            </FloatRight>
          </MenuLower>
        </MenuBar>
        <Wrapper>
          <CardWrapper showMap={this.state.showMap}>
            <Cards id="cards" listView={this.state.listView}>
              {cardData.length == 0 && (
                <ResultsTextContainer>sorry, no results</ResultsTextContainer>
              )}
              {cardData.length >= 1 &&
                dataPartial.map((d, i) => {
                  return (
                    <Card
                      listView={this.state.listView}
                      key={i}
                      name={d.name}
                      imgUrl={`${getImgUrl(d)}`}
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
          {this.state.showMap && <MapContainer cardData={cardData} />}
        </Wrapper>
        pagination goes here?
      </CardSectionWrapper>
    );
  }
}

export default CardSection;
