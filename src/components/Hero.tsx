import React, { useState } from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT, FONT } from "@src/theme";
import arrowIcon from "@public/assets/icons/arrow.png";
import SelectDropdown from "@src/components/SelectDropdown";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw;

  ${BREAKPOINT.m`
    display: flex;
    `};
`;

const MainSearch = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const Filters = styled.form`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  ${BREAKPOINT.m`
    align-items: center;
  `};
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${BREAKPOINT.m`
    // display: flex;
    // flex-direction: column;
    align-items: center;
  `};
`;

const FilterTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: flex-end;

  ${BREAKPOINT.m`
      display: flex;
      flex-direction: row;
      align-items: center;
  `};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font: normal 500 16px/23px ${FONT.sansSerif};
  ${BREAKPOINT.m`
    font-size: 20px;
    width: 100%;
  `};
`;

const FindFoodBtn = styled.button`
  width: 100%;
  background: ${COLOR.black};
  color: ${COLOR.white};
  border-radius: 0.5rem;
  margin: 1rem 0.5rem;
  padding: 8px 10px;
`;

const Buttons = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${BREAKPOINT.m`
  flex-direction: row;
  `};
`;

const Filter = styled.select`
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid ${COLOR.black};
  padding: 0.6em 1.4em 0.5em 0.8em;
  border-radius: 0em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url(${arrowIcon});
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin: 0 1rem;
  width: 160px;
  font: normal 500 16px/23px ${FONT.sansSerif};
  ${BREAKPOINT.m`
    font-size: 20px;
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

const ResetBtn = styled.button`
  width: 100%;
  background: none;
  border: 1px solid ${COLOR.black};
  border-radius: 0.5rem;
  margin: 1rem 0.5rem;
  padding: 8px 10px;
`;

const PRICE_SELECT = [
  { name: "any price", value: "any" },
  { name: "$", value: 1 },
  { name: "$$", value: 2 },
  { name: "$$$", value: 3 }
];

const DISTANCE_SELECT = [
  { name: "any distance", value: "any" },
  { name: "under 5 minutes", value: 5 },
  { name: "under 10 minutes", value: 10 }
];

interface HeroProps {
  data: any;
  cuisines: any;
  handleClick: any;
  handleReset;
}
const Hero = ({ handleClick, cuisines, handleReset }: HeroProps) => {
  const [cuisineFilter, setCuisineFilter] = useState("any");
  const [priceFilter, setPriceFilter] = useState("any");
  const [distanceFilter, setDistanceFilter] = useState("any");

  function handleChange(cuisineFilter, priceFilter, distanceFilter) {
    handleClick(cuisineFilter, priceFilter, distanceFilter);
  }

  return (
    <HeroContainer>
      <MainSearch>
        <h1>What sounds good?</h1>
        <Filters>
          <FiltersContainer>
            <FilterTop>
              <FilterGroup>
                <SelectDropdown
                  name={"cusine"}
                  label={"I want"}
                  value={cuisineFilter}
                  options={cuisines}
                  handleChange={e => {
                    setCuisineFilter(e.target.value);
                    handleChange(e.target.value, priceFilter, distanceFilter);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <SelectDropdown
                  name={"price"}
                  label={"for"}
                  value={priceFilter}
                  options={PRICE_SELECT.map(price => price)}
                  handleChange={e => {
                    setPriceFilter(e.target.value);
                    handleChange(cuisineFilter, e.target.value, distanceFilter);
                  }}
                />
              </FilterGroup>
            </FilterTop>
            <FilterGroup>
              <SelectDropdown
                name={"distance"}
                label={"and want to walk"}
                value={distanceFilter}
                options={DISTANCE_SELECT.map(price => price)}
                handleChange={e => {
                  setDistanceFilter(e.target.value);
                  handleChange(cuisineFilter, priceFilter, e.target.value);
                }}
              />
            </FilterGroup>
          </FiltersContainer>
        </Filters>
        <Buttons>
          <ResetBtn
            onClick={e => {
              setCuisineFilter("any");
              setPriceFilter("any");
              setDistanceFilter("any");
              handleReset(e);
            }}
          >
            Reset
          </ResetBtn>

          <FindFoodBtn
            type="submit"
            onClick={e => {
              e.preventDefault();
              handleClick(cuisineFilter, priceFilter, distanceFilter);
            }}
          >
            Find Food!
          </FindFoodBtn>
        </Buttons>
      </MainSearch>
    </HeroContainer>
  );
};

export default Hero;
