import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";

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

const SearchButton = styled.button`
    background: ${COLOR.black};
    color: ${COLOR.white};
    width: 50px%;
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
  // handleSubmit: () => any;
  handleSearchClick: any,
  handleRandomizeClick: any,
  randomId: any
}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (e) => {
    const val = e.target.value.value
    e.preventDefault();
    this.props.handleSearchClick(val)
  }

  handleRandomSubmit = () => {
    alert("random clicked")
  }

  render() {
    const { handleSearchClick, handleRandomizeClick, randomId } = this.props;

    return (
      <SearchSectionContainer>
        <Section>
          <form onSubmit={this.handleSubmit}>
            <h2>Looking for something specific?</h2>
            <p>Search for a resturant by name</p>
            <SearchContainer>
              <Input name="value" placeholder="Heno Heno..." />
              <SearchButton>Search</SearchButton>
            </SearchContainer>
          </form>
        </Section>
        {/* <hr style={{ width: 100 + "%", margin: 2 + "rem" }} /> */}
        <Section>
          <h2>Can't decide?</h2>
          <p>Click the randomize button and we’ll choose a random resturant for you.</p>
          <RandomizeButton onClick={handleRandomizeClick}>Randomize</RandomizeButton>
          {randomId && <p>you should to go {randomId.name} for lunch!</p>}
        </Section>
      </SearchSectionContainer>
    )
  }
}

export default SearchSection;
