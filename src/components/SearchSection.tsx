import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";
import searchIcon from "@public/assets/icons/search.png";

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

  form {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  ${BREAKPOINT.m`
  max-width: 350px;
`};

  input {
    border-radius: 0.5rem 0 0 0.5rem;
  }
`;

const SearchBtn = styled.button`
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100px;
  background: ${COLOR.black};
  color: ${COLOR.white};
  border: 1px solid ${COLOR.black};
  border-radius: 0rem 0.5rem 0.5rem 0rem;

  img {
    width: 15px;
  }
`;

const RandomizeButton = styled.button`
  padding: 8px 10px;
  margin-top: 2rem;
  background: ${COLOR.black};
  color: ${COLOR.white};
  border-radius: 0.5rem;
  width: 100%;

  ${BREAKPOINT.m`
    max-width: 350px;
  `};
`;

const Input = styled.input`
  padding: 8px 10px;
  width: 100%;
`;

const Line = styled.hr`
  width: 200px;
  margin: 2rem;
  height: 1px;

  ${BREAKPOINT.m`
    width: 600px;
      margin: 2rem;
      height: 1px;
      transform: rotate(90deg);
  `};
`;

class SearchSection extends React.Component<{
  handleRandomizeClick: any;
  handleReset: any;
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
      handleReset,
      handleInputChange,
      searchData,
      query
    } = this.props;

    return (
      <SearchSectionContainer>
        <Section>
          <form>
            <h2>Can't find something?</h2>
            <p>Search for a resturant, cuisine, or location</p>
            <SearchContainer>
              <Input
                onChange={e => {
                  handleInputChange(e.target.value);
                }}
                name="value"
                placeholder="Restaurant or cuisine..."
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
                <img src={searchIcon} alt="search" />
              </SearchBtn>
            </SearchContainer>
          </form>
        </Section>
        <Line />
        <Section>
          <h2>Can't decide?</h2>
          <p>Click the button to get a random resturant.</p>
          <RandomizeButton onClick={handleRandomizeClick}>
            Randomize
          </RandomizeButton>
        </Section>
      </SearchSectionContainer>
    );
  }
}

export default SearchSection;
