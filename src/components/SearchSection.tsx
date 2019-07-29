import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";
import Suggestions from "@components/Suggestions"

const SearchSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

  ${BREAKPOINT.m`
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
    `};
`
const Section = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;

    ${BREAKPOINT.m`
      margin: 3rem 4rem;
    `};
`

const SearchContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    ${BREAKPOINT.m`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    `};
`

const SearchBtn = styled.button`
    background: ${COLOR.black};
    color: ${COLOR.white};
    width: 100%;
    margin-top: 1rem;
    border: 1px solid ${COLOR.black};

  ${BREAKPOINT.m`
       margin-top: 0rem;
    `};
`

const RandomizeButton = styled.button`
    margin-top: 2rem;
    background: ${COLOR.black};
    color: ${COLOR.white};
    width: 100%;
`

const Input = styled.input`
    width: 100%;
`


class SearchSection extends React.Component<{
  handleRandomizeClick: any,
  handleInputChange: any,
  results: any,
  searchData: any
}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleRandomizeClick, handleInputChange, results, searchData } = this.props;

    return (
      <SearchSectionContainer>
        <Section>
          <form onSubmit={(e) => {
            e.preventDefault(); searchData
          }}>
            <h2>Looking for something specific?</h2>
            <p>Search for a resturant by name</p>
            <SearchContainer>
              <Input onChange={(e) => { handleInputChange(e.target.value) }} name="value" placeholder="Heno Heno..." />
              <SearchBtn type="submit">Search</SearchBtn>
            </SearchContainer>
            {/* <Suggestions results={results} /> */}
          </form>
        </Section>
        <hr style={{ width: 100 + "%", margin: 2 + "rem" }} />
        <Section>
          <h2>Can't decide?</h2>
          <p>Click the randomize button and we’ll choose a random resturant for you.</p>
          <RandomizeButton onClick={handleRandomizeClick}>Randomize</RandomizeButton>
        </Section>
      </SearchSectionContainer>
    )
  }
}

export default SearchSection;
