import React from "react";
import styled from "styled-components";
import Card from "./Card";
import {COLOR, BREAKPOINT, FONT} from "@src/theme";
import MapContainer from "@components/MapContainer";
import Pagination from "react-js-pagination";
import SelectDropdown from "@src/components/SelectDropdown";

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
        padding: 0.5rem 1rem;
      `};
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

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  align-items: center;
`;

const FloatRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${BREAKPOINT.m`
    margin-right: 1
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

const SORT_BTN_SELECT = [
  {name: "Top rated", value: "rating"},
  {name: "Closest", value: "distance"},
  {name: "A-Z", value: "a-z"},
];

interface CardSectionState {
  sortParams: string;
  activePage: number;
  clickedLat: number;
  clickedLong: number;
  clickedPos: string;
}

interface CardSectionProps {
  cardData: any;
  updateSortParams: any;
  resultsText: string;
  query: any;
  sortParams: string;
  activePage: number;
  changeActivePage: any;
}
class CardSection extends React.Component<CardSectionProps, CardSectionState> {
  constructor(props) {
    super(props);
    this.state = {
      sortParams: this.props.sortParams,
      clickedLat: null,
      activePage: this.props.activePage,
      clickedLong: null,
      clickedPos: null,
    };
  }

  render() {
    const {cardData, updateSortParams, sortParams, resultsText, activePage, changeActivePage} = this.props;

    const perPage = () => {
      return window.innerWidth >= 1750 ? 12 : window.innerWidth >= 1320 ? 9 : window.innerWidth >= 900 ? 6 : 3;
    };

    const dataPartial = () => {
      const offset = () => {
        if (activePage == 1) {
          return 0;
        } else return perPage() * (activePage - 1);
      };

      const partialData = cardData.slice(offset(), offset() + perPage());
      return partialData;
    };

    return (
      <CardSectionWrapper>
        <MenuBar>
          <div>{resultsText && <ResultsTextContainer>{resultsText}</ResultsTextContainer>}</div>
          <FloatRight>
            <SelectDropdown
              name="sort"
              label="sort results"
              value={sortParams}
              options={SORT_BTN_SELECT.map(opt => opt)}
              handleChange={e => {
                updateSortParams(e.target.value);
                this.setState({sortParams: e.target.value, activePage: 1});
              }}
              isBorderStyle
            />
          </FloatRight>
        </MenuBar>
        <Wrapper>
          <CardWrapper>
            <Cards id="cards">
              {cardData.length >= 1 &&
                dataPartial().map((d, i) => {
                  const cuisinePathName = d.cuisine.toLowerCase();
                  const cuisineFallbackImg = `./assets/img/cards/placeholders/${cuisinePathName}.jpg`;
                  return (
                    <Card
                      key={`card-${i}`}
                      name={d.name}
                      imgUrl={d.imgUrl && d.imgUrl !== "" ? `./assets/img/cards/${d.imgUrl}` : cuisineFallbackImg}
                      price={d.price}
                      lat={d.lat}
                      long={d.long}
                      rating={d.rating}
                      distance={d.distanceMinutes}
                      description={d.description}
                      handleCardClick={() => {
                        this.setState({
                          clickedPos: d.name,
                        });
                      }}
                      tags={[d.cuisine, d.cuisine2, d.cuisine3]}
                    />
                  );
                })}
            </Cards>
            {cardData.length > perPage() && (
              <Pagination
                prevPageText="<"
                nextPageText=">"
                activePage={this.props.activePage}
                itemsCountPerPage={perPage()}
                totalItemsCount={cardData.length}
                pageRangeDisplayed={3}
                onChange={pageNumber => {
                  changeActivePage(pageNumber);
                }}
                hideFirstLastPages={true}
              />
            )}
          </CardWrapper>
          <MapContainer clickedPos={this.state.clickedPos} cardData={dataPartial()} />
        </Wrapper>
      </CardSectionWrapper>
    );
  }
}

export default CardSection;
