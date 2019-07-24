import React from "react";
import styled from "styled-components";
import Card from "./Card"
import { COLOR } from "../theme";

const CardSectionWrapper = styled.section`
`

const MenuBar = styled.div`

`

const Sort = styled.button`
    margin-left: 1rem;
    color: ${COLOR.black};
    background: none;
`

const Cards = styled.div`
`

export default () => (
    <CardSectionWrapper>
        <MenuBar>
            Results
            <Sort>List view</Sort>
            <Sort>Sort <img src="../img/arrow.png" alt="" /></Sort>
        </MenuBar>
        <Cards>
            <Card />
            <Card />
        </Cards>
    </CardSectionWrapper>
);