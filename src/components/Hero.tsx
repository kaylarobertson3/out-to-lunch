import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
`
const MainSearch = styled.div`
  margin: 1rem 0;
  text-align: center;
`

const Filters = styled.form`
  margin-top: 1rem;

  ${BREAKPOINT.m`
    display: flex;
    `};
  div {
    /* ${BREAKPOINT.m`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    `}; */
  }
`

const Label = styled.p`
  margin: 2rem 0 0 0;
`

const FindFoodBtn = styled.button`
    margin-top: 2rem;
    width: 100%;
    background: ${COLOR.black};
    color: ${COLOR.white};
`

const CuisineFilter = styled.select`
  width: 150px;
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid ${COLOR.black};
  padding: .6em 1.4em .5em .8em;
	border-radius: 0em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-image: url('../img/arrow.png');
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
  margin-left: 1rem;

    ::-ms-expand {
    display: none;
  }

  :hover {
    border-color: #888;
  }

  :focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  option {
    font-weight:normal;
  }

    /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"], :root:lang(ar), :root:lang(iw) {
    background-position: left .7em top 50%, 0 0;
    padding: .6em .8em .5em 1.4em;
  }

  /* Disabled styles */
  :disabled, [aria-disabled=true] {
    color: graytext;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  }
  :disabled:hover, [aria-disabled=true] {
    border-color: #aaa;
  }
`

class Hero extends React.Component<{ handleClick: any }, { cuisine: any, price: any, distance: number }>{
  constructor(props) {
    super(props);
    this.state = {
      cuisine: null,
      price: null,
      distance: null
    }
  }

  handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value
    this.state[key] = value
  }

  render() {

    const { handleClick } = this.props;

    return (
      <HeroContainer>
        <Img src="../img/burger.png" />
        <MainSearch>
          <h1>What sounds good?</h1>
          <Filters>
            <div>
              <Label>I want to eat</Label>
              <CuisineFilter name="cuisine" onChange={this.handleChange}>
                <option value="anything">Anything</option>
                <option value="ramen">ramen</option>
                <option value="Japanese">Japanese</option>
              </CuisineFilter>
            </div>
            <div>
              <Label>I'd like to spend </Label>
              <CuisineFilter name="price" onChange={this.handleChange}>
                <option value="any">Any price</option>
                <option value="5">under 5</option>
                <option value="10">around 10</option>
                <option value="10+++">more than ten</option>
              </CuisineFilter>
            </div>
            <div>
              <Label> I'm up for walking</Label>
              <CuisineFilter name="distance" onChange={this.handleChange}>
                <option value="any">Any distance</option>
                <option value="<5">under 5 minutes</option>
                <option value="10 ish">under 10 minutes</option>
                <option value="10+">10+</option>
              </CuisineFilter>
            </div>
            <FindFoodBtn onClick={(e) => {
              e.preventDefault();
              handleClick(this.state)
            }}>
              Find Food!
            </FindFoodBtn>
          </Filters>
        </MainSearch>
      </HeroContainer>
    )
  }

}

export default Hero;



