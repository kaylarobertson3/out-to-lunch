import React from "react";
import styled from "styled-components";
import Card from "./Card"
import { COLOR } from "@src/theme";

const CardSectionWrapper = styled.section`
`

const MenuBar = styled.div`

`

const ListViewBtn = styled.button`
    background: none;

`

const Sort = styled.button`
    margin-left: 1rem;
    color: ${COLOR.black};
    background: none;
`

const Cards = styled.div`
`

class CardSection extends React.Component<{
}>{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleClick = () => {

    }

    render() {
        return (
            <CardSectionWrapper>
                <MenuBar>
                    Results
                <ListViewBtn onClick={this.handleClick}>List view</ListViewBtn>
                    <Sort>Sort <img src="../img/arrow.png" alt="" /></Sort>
                </MenuBar>
                <Cards>
                    <Card name={"Pizza Place"} imgUrl={"../img/cards/pizza.jpg"} price={'$'} rating={3.9} />
                    <Card name={"Tommi's Burger Joint"} imgUrl={"../img/cards/burger.jpg"} price={'$$$'} rating={4.5} />
                    <Card name={"Heno Heno"} imgUrl={"../img/cards/ramen.jpg"} price={'$$'} rating={4.9} />
                </Cards>
            </CardSectionWrapper>
        )
    }
}


export default CardSection