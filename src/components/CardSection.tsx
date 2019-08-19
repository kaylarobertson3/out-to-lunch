import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { COLOR, BREAKPOINT, FONT } from "@src/theme";
import MapContainer from "@components/MapContainer";
import listIcon from "@public/assets/icons/list.png";
import mapIcon from "@public/assets/icons/map.png";
import groupIcon from "@public/assets/icons/group.png";
import arrowIcon from "@public/assets/icons/arrow.png";
import Pagination from "react-js-pagination";

const CardSectionWrapper = styled.section`
  max-width: 100vw;
  height: 100%;

  .pagination {
    margin: 2rem 1rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      padding: 0.3rem 0.5rem;
      margin: 0.5rem;
      border: 1px solid black;
      background: ${COLOR.white};
      border-radius: 3px;
      color: ${COLOR.black};
      cursor: pointer;

      a {
        text-decoration: none;
      }
      ${BREAKPOINT.m`
      margin: 1rem;
      padding: 0.5rem 1rem;  `};

      :hover {
        background: ${COLOR.black};
        color: ${COLOR.white};
      }
    }
    .active {
      background: ${COLOR.black};
      color: ${COLOR.white};
    }

    .disabled {
      opacity: 0.2;
      cursor: default;
      a {
        cursor: default;
      }

      :hover {
        color: ${COLOR.black};
        background: none;
        background: default;
      }
    }
  }
`;

const MenuBar = styled.div<{ showMap: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  align-items: center;
`;

const FloatLeft = styled.div``;

const FloatRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ViewBtn = styled.button`
  background: none;
  display: flex;
  padding: 5px 8px;
  align-items: center;
  border-radius: 5px;

  img {
    margin-left: 0;
    width: 15px;

    ${BREAKPOINT.m`
        margin-left: 1rem;
      `};
  }

  .text {
    display: none;
    ${BREAKPOINT.m`
        display: block;
      `};
  }

  ${BREAKPOINT.m`
      min-width: 100px;
  `};
`;

const SortBtn = styled.select`
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
  padding: 5px 30px 5px 8px;
  color: ${COLOR.black};
  min-width: 150px;
  border-radius: 5px;
  border: 1px solid ${COLOR.black};
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url(${arrowIcon});
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin: 0 1rem;
  min-width: 160px;

  font: normal 500 16px/23px ${FONT.sansSerif};
  ${BREAKPOINT.m`
    font-size: 16px;
  `};

  ::-ms-expand {
    display: none;
  }

  :hover {
    border-color: #888;
  }

  :focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  option {
    font-weight: normal;
  }

  /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"],
  :root:lang(ar),
  :root:lang(iw) {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  }

  /* Disabled styles */
  :disabled,
  [aria-disabled="true"] {
    color: graytext;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  }
  :disabled:hover,
  [aria-disabled="true"] {
    border-color: #aaa;
  }
`;

const CardWrapper = styled.div<{ showMap: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${BREAKPOINT.m`
    margin-right: ${props => (props.showMap ? "1" : "0")};
  `};
`;

const Cards = styled.div`
  display: grid;
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
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.2;
  ${BREAKPOINT.m`
  `};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${BREAKPOINT.m`
      flex-direction: row;
  `};
`;

class CardSection extends React.Component<
  {
    cardData: any;
    updateSortParams: any;
    resultsText: string;
    query: any;
    sortParams: string;
    isReset: boolean;
  },
  {
    showMap: boolean;
    sortParams: string;
    activePage: number;
    clickedLat: number;
    clickedLong: number;
    clickedPos: any;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      showMap: true,
      activePage: 1,
      sortParams: this.props.sortParams,
      clickedLat: null,
      clickedLong: null,
      clickedPos: null
    };
  }

  componentDidMount = () => {
    // if (window.innerWidth <= 700) {
    //   this.setState({
    //     showMap: false
    //   });
    // }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isReset !== nextProps.isReset) {
      this.setState({
        activePage: 1
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
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
      updateSortParams,
      sortParams,
      resultsText,
      query
    } = this.props;

    const perPage = () => {
      // if (this.state.showMap) {
      return window.innerWidth >= 1750
        ? 12
        : window.innerWidth >= 1320
        ? 9
        : window.innerWidth >= 900
        ? 6
        : 3;
      // } else {
      //   return window.innerWidth >= 1750
      //     ? 18
      //     : window.innerWidth >= 1465
      //     ? 15
      //     : window.innerWidth >= 1185
      //     ? 12
      //     : 9;
      // }
    };

    const dataPartial = () => {
      const activePage = this.state.activePage;

      const offset = () => {
        if (activePage == 1) {
          return 0;
        } else return perPage() * (activePage - 1);
      };

      const partialData = cardData.slice(offset(), offset() + perPage());
      return partialData;
    };

    // const mapText = this.state.showMap ? "Hide map" : "View map";

    return (
      <CardSectionWrapper>
        <MenuBar showMap={this.state.showMap}>
          <FloatLeft>
            {resultsText && (
              <ResultsTextContainer>{resultsText}</ResultsTextContainer>
            )}
          </FloatLeft>
          <FloatRight>
            <SortBtn
              name="sort"
              onChange={e => {
                updateSortParams(e.target.value);
                this.setState({ sortParams: e.target.value, activePage: 1 });
              }}
              value={sortParams}
            >
              <option value={"rating"}>Sort by: top rated</option>
              <option value={"distance"}>Sort by: closest</option>
              <option value={"a-z"}>Sort: A-Z</option>
              <img src="../assets/icons/arrow.png" alt="" />
            </SortBtn>

            {/* <ViewBtn onClick={this.toggleMapView}>
              <span className="text">{mapText}</span>
              <span>
                <img src={mapIcon} />
              </span>
            </ViewBtn> */}
          </FloatRight>
        </MenuBar>
        <Wrapper>
          <CardWrapper showMap={this.state.showMap}>
            <Cards id="cards">
              {cardData.length >= 1 ? (
                dataPartial().map((d, i) => {
                  const cuisinePathName = d.cuisine.toLowerCase();
                  const cuisineFallbackImg = `./assets/img/cards/placeholders/${cuisinePathName}.jpg`;
                  return (
                    <Card
                      key={`card-${i}`}
                      name={d.name}
                      imgUrl={
                        d.imgUrl && d.imgUrl !== ""
                          ? `./assets/img/cards/${d.imgUrl}`
                          : cuisineFallbackImg
                      }
                      price={d.price}
                      lat={d.lat}
                      long={d.long}
                      rating={d.rating}
                      distance={d.distanceMinutes}
                      description={d.description}
                      handleCardClick={() => {
                        this.setState({
                          clickedPos: d.name
                        });
                      }}
                      closePopup={() => {
                        this.setState({
                          clickedPos: null
                        });
                      }}
                      tags={[d.cuisine, d.cuisine2, d.cuisine3]}
                    />
                  );
                })
              ) : (
                <ResultsTextContainer>
                  Can't find what you're looking for? Suggest a resturant to be
                  added <a>here.</a>
                </ResultsTextContainer>
              )}
            </Cards>
            {cardData.length > perPage() && (
              <Pagination
                prevPageText="<"
                nextPageText=">"
                activePage={this.state.activePage}
                itemsCountPerPage={perPage()}
                totalItemsCount={cardData.length}
                pageRangeDisplayed={3}
                onChange={this.handlePageChange}
                hideFirstLastPages={true}
              />
            )}
          </CardWrapper>
          {this.state.showMap && (
            <MapContainer
              clickedPos={this.state.clickedPos}
              cardData={dataPartial()}
            />
          )}
        </Wrapper>
      </CardSectionWrapper>
    );
  }
}

export default CardSection;
