import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";

const SearchSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;

  ${BREAKPOINT.m`
          flex-direction: row;
          align-items: center;
          justify-content: center;
    `};
`;

const Section = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;

  h2 {
    margin: 0 0 1rem 0;
  }
`;

const SearchContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    /* ${BREAKPOINT.m`
        display: flex;
        flex-direction: row;
        justify-content: center;
    `}; */

    input {
      border-radius: 0.5rem 0 0 .5rem;
    }
`;

const SearchBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100px;
  background: ${COLOR.black};
  color: ${COLOR.white};
  border: 1px solid ${COLOR.black};
  border-radius: 0rem 0.5rem 0.5rem 0rem !important;

  img {
    width: 15px;
  }

  ${BREAKPOINT.m`
      margin-top: 0rem;
  `};
`;

const RandomizeButton = styled.button`
  margin-top: 2rem;
  background: ${COLOR.black};
  color: ${COLOR.white};
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const Line = styled.hr`
  width: 300px;
  margin: 2rem;
  height: 1px;

  ${BREAKPOINT.m`
    width: 300px;
      margin: 2rem;
      height: 1px;
      transform: rotate(90deg);
  `};
`;

class SearchSection extends React.Component<{
  handleRandomizeClick: any;
  handleInputChange: any;
  searchData: any;
  query: string;
}> {
  constructor(props) {
    super(props);
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.searchData();
    }
  };
  render() {
    const {
      handleRandomizeClick,
      handleInputChange,
      searchData,
      query
    } = this.props;

    return (
      <SearchSectionContainer>
        <Section>
          <form>
            <h2>Looking for something specific?</h2>
            <p>Search for a resturant, cuisine, or location</p>
            <SearchContainer>
              <Input
                onChange={e => {
                  handleInputChange(e.target.value);
                }}
                name="value"
                placeholder="Heno Heno..."
                onKeyDown={e => {
                  this.handleKeyPress(e);
                }}
                value={query}
              />
              <SearchBtn
                onClick={e => {
                  e.preventDefault();
                  searchData();
                }}
              >
                <img src="../img/icons/search.png" alt="search" />
              </SearchBtn>
            </SearchContainer>
          </form>
        </Section>
        <Line />
        <Section>
          <h2>Can't decide?</h2>
          <p>
            Click the randomize button and we’ll choose a random resturant for
            you.
          </p>
          <RandomizeButton onClick={handleRandomizeClick}>
            Randomize
          </RandomizeButton>
        </Section>
      </SearchSectionContainer>
    );
  }
}

export default SearchSection;
