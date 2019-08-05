import React from "react";
import styled from "styled-components";
import Card from "./Card";
import CardAlt from "./CardAlt";
import { COLOR, BREAKPOINT } from "@src/theme";
import MapContainer from "@components/MapContainer";

const CardSectionWrapper = styled.section`
  max-width: 100vw;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-direction: column;
  ${BREAKPOINT.m`
      // margin-left: 1rem;
      flex-direction: row;
  `};
`;
const MenuLeft = styled.div``;

const MenuRight = styled.div`
  display: flex;
  align-content: center;
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

const ExtraFilters = styled.div`
  padding: 1rem;

  p {
    margin: 0 1rem 0 0;
  }

  ${BREAKPOINT.m`
    display: flex;
    flex-direction: row;
  `};
`;

const SortDropdown = styled.div`
  position: absolute;
  z-index: 1;
  background: ${COLOR.lightGray};
  padding: 8px 10px;
  margin-top: 3rem;
  right: 1rem;
  z-index: 500;

  ${BREAKPOINT.m`
      // margin-top: 0;
      // right: auto;
      margin-right: 2rem;
    `};

  p {
    margin: 0.5rem 0;
    cursor: pointer;

    :hover {
      color: ${COLOR.darkGray};
    }
  }
`;

const SortBtn = styled.button`
  color: ${COLOR.black};
  background: none;
  padding: 0;
  display: flex;
  align-items: center;

  img {
    margin-left: 1rem;
  }
`;
const SortTerms = styled.span`
  margin-left: 0.5rem;
  display: none;

  ${BREAKPOINT.m`
    display: block;
  `};
`;

const Cards = styled.div<{ listView: boolean }>`
  display: ${props => (props.listView ? "block" : "grid")};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 45px 35px;
  align-items: stretch;

  ${BREAKPOINT.m`
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    `};
`;

const ResultsTextContainer = styled.h4`
  font-weight: 400;
  font-size: 1.3rem;
`;

class CardSection extends React.Component<
  {
    cardData: any;
    resultsText: string;
    sortAz: any;
    sortRating: any;
    sortDistance: any;
    query: any;
    sortTerms: string;
  },
  {
    listView: boolean;
    showSortOptions: boolean;
    showExtraFilters: boolean;
    showMap: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      showSortOptions: false,
      showExtraFilters: false,
      showMap: false
    };
  }

  toggleListView = e => {
    e.preventDefault();
    this.setState({
      listView: !this.state.listView
    });
  };

  showSortOptions = e => {
    e.preventDefault();
    this.setState({
      showSortOptions: !this.state.showSortOptions
    });
  };

  toggleExtraFilters = e => {
    e.preventDefault();
    this.setState({
      showExtraFilters: !this.state.showExtraFilters
    });
  };

  toggleMapView = e => {
    e.preventDefault();
    this.setState({
      showMap: !this.state.showMap
    });
  };

  render() {
    const {
      cardData,
      sortAz,
      sortRating,
      sortDistance,
      sortTerms,
      resultsText
    } = this.props;
    const viewText = this.state.listView ? "Grid View" : "List View";
    const mapText = this.state.showMap ? "Hide map" : "View map";
    return (
      <CardSectionWrapper>
        <MenuBar>
          <MenuLeft>
            {resultsText && (
              <ResultsTextContainer>{resultsText}</ResultsTextContainer>
            )}
          </MenuLeft>
          <MenuRight>
            {/* TODO: add more features functionality */}
            {/* <ViewBtn onClick={this.toggleExtraFilters}>
              {this.state.showExtraFilters
                ? "Hide filters"
                : "Show more filters"}
            </ViewBtn> */}
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
            <SortBtn onClick={this.showSortOptions}>
              Sort
              <SortTerms>: {sortTerms}</SortTerms>
              <img src="../img/icons/arrow.png" alt="" />
            </SortBtn>
            {this.state.showSortOptions && (
              <SortDropdown>
                <p
                  onClick={e => {
                    e.preventDefault;
                    this.setState({ showSortOptions: false });
                    sortRating();
                  }}
                >
                  highest rated
                </p>
                <p
                  onClick={e => {
                    e.preventDefault;
                    this.setState({ showSortOptions: false });
                    sortDistance();
                  }}
                >
                  closest
                </p>
                <p
                  onClick={e => {
                    e.preventDefault;
                    this.setState({ showSortOptions: false });
                    sortAz();
                  }}
                >
                  A-Z
                </p>
              </SortDropdown>
            )}
          </MenuRight>
        </MenuBar>
        {this.state.showExtraFilters && (
          <ExtraFilters>
            <p>bakery</p> <p>IGG favorite</p>
            <p>Vegetarian</p>
          </ExtraFilters>
        )}
        {this.state.showMap && <MapContainer cardData={cardData} />}
        <Cards id="cards" listView={this.state.listView}>
          {cardData.length == 0 && (
            <ResultsTextContainer>sorry, no results</ResultsTextContainer>
          )}
          {typeof cardData.length == "undefined" && (
            <Card
              listView={this.state.listView}
              name={cardData.name}
              imgUrl={`../img/cards/${cardData.imgUrl}`}
              price={cardData.price}
              rating={cardData.rating}
              distance={cardData.distance}
              description={cardData.description}
            />
          )}

          {cardData.length >= 1 &&
            cardData.map((d, i) => {
              var imgUrl;
              if (d.imgUrl && d.imgUrl.length > 1) {
                imgUrl = d.imgUrl;
              } else if (d.cuisine) {
                const lowerCuisine = d.cuisine.toLowerCase();
                imgUrl = `../cards/placeholders/${lowerCuisine}.jpg`;
              }
              return (
                <CardAlt
                  listView={this.state.listView}
                  key={i}
                  name={d.name}
                  imgUrl={`../img/cards/${imgUrl}`}
                  price={d.price}
                  rating={d.rating}
                  distance={d.distance}
                  description={d.description}
                  tags={[d.cuisine, d.cuisine2, d.cuisine3]}
                />
              );
            })}
        </Cards>
      </CardSectionWrapper>
    );
  }
}

export default CardSection;
