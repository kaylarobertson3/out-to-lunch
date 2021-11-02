import SelectDropdown from '@src/components/SelectDropdown';
import { BREAKPOINT, COLOR } from '@src/theme';
import React, { useState } from 'react';
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

const FiltersContainer = styled.form`
  form {
    margin: 0.2rem 0.5rem;
  }
`;

const FilterTop = styled.div`
  display: flex;
  flex-direction: column;

  ${BREAKPOINT.m`
    display: flex;
    flex-direction: row;
    align-items: center;
  `};

  :nth-child(2) {
    ${BREAKPOINT.m`
      marginLeft: 2rem;
    `}
  }
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
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;

  ${BREAKPOINT.m`
    flex-direction: row;
    margin-top: 2rem;
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
  { name: 'any price', value: 'any' },
  { name: '$', value: 1 },
  { name: '$$', value: 2 },
  { name: '$$$', value: 3 },
];

const DISTANCE_SELECT = [
  { name: 'any distance', value: 'any' },
  { name: 'under 5 minutes', value: 5 },
  { name: 'under 10 minutes', value: 10 },
];

interface HeroProps {
  data: any;
  cuisines: any;
  handleSearch: any;
  handleReset;
}
const Hero = ({ handleSearch, cuisines, handleReset }: HeroProps) => {
  const [cuisineFilter, setCuisineFilter] = useState('any');
  const [priceFilter, setPriceFilter] = useState('any');
  const [distanceFilter, setDistanceFilter] = useState('any');

  return (
    <HeroContainer>
      <MainSearch>
        <h1>What sounds good?</h1>
        <FiltersContainer>
          <FilterTop>
            <SelectDropdown
              name={'cusine'}
              label={'Cuisine:'}
              value={cuisineFilter}
              options={cuisines}
              handleChange={e => {
                setCuisineFilter(e.target.value);
              }}
            />
            <SelectDropdown
              name={'price'}
              label={'Price point:'}
              value={priceFilter}
              options={PRICE_SELECT.map(price => price)}
              handleChange={e => {
                setPriceFilter(e.target.value);
              }}
            />
          </FilterTop>
          <SelectDropdown
            name={'distance'}
            label={'Walking distance:'}
            value={distanceFilter}
            options={DISTANCE_SELECT.map(price => price)}
            handleChange={e => {
              setDistanceFilter(e.target.value);
            }}
          />
        </FiltersContainer>
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
              handleSearch(cuisineFilter, priceFilter, distanceFilter);
            }}
          >
            Search
          </FindFoodBtn>
        </Buttons>
      </MainSearch>
    </HeroContainer>
  );
};

export default Hero;
