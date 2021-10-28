import SelectDropdown from '@src/components/SelectDropdown';
import {BREAKPOINT, COLOR} from '@src/theme';
import React, {useState} from 'react';
import styled from 'styled-components';

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

const ResetBtn = styled.button`
  width: 100%;
  background: none;
  border: 1px solid ${COLOR.black};
  border-radius: 0.5rem;
  margin: 0rem 0.5rem;
  padding: 8px 10px;
  ${BREAKPOINT.m`
    margin: 1rem 0.5rem;
  `};
`;

const PRICE_SELECT = [
  {name: 'any price', value: 'any'},
  {name: '$', value: 1},
  {name: '$$', value: 2},
  {name: '$$$', value: 3},
];

const DISTANCE_SELECT = [
  {name: 'any distance', value: 'any'},
  {name: 'under 5 minutes', value: 5},
  {name: 'under 10 minutes', value: 10},
];

interface HeroProps {
  data: any;
  cuisines: any;
  handleClick: any;
  handleReset;
}
const Hero = ({handleClick, cuisines, handleReset}: HeroProps) => {
  const [cuisineFilter, setCuisineFilter] = useState('any');
  const [priceFilter, setPriceFilter] = useState('any');
  const [distanceFilter, setDistanceFilter] = useState('any');

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
                  name={'cusine'}
                  label={'I want'}
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
                  name={'price'}
                  label={'for'}
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
                name={'distance'}
                label={'and want to walk'}
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
              setCuisineFilter('any');
              setPriceFilter('any');
              setDistanceFilter('any');
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
