import React from "react";
import styled from "styled-components";

const Hero = styled.section`
  margin: 1rem;
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

const Filters = styled.div`
  margin-top: 1rem;
  `
const Label = styled.p`
  
`

const CuisineFilter = styled.p``

export default () => (
    <Hero>
        <Img src="../img/burger.png" />
        <MainSearch>
            <h1>What sounds good?</h1>
            <Filters>
                <Label>I want to eat</Label>
                <CuisineFilter>anything</CuisineFilter>
                <Label>I'd like to spend </Label>
                <CuisineFilter>any price</CuisineFilter>
                <Label>    I'm up for walking</Label>
                <CuisineFilter>any distance</CuisineFilter>
            </Filters>
        </MainSearch>
    </Hero>
)