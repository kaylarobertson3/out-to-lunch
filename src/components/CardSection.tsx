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

const Cards = styled.div<{ listView: boolean }>`
    display: ${props => props.listView ? "block" : "grid"};
    /* display: grid; */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
`

class CardSection extends React.Component<{}, {
    listView: boolean;
}>{
    constructor(props) {
        super(props);
        this.state = {
            listView: false
        }
        this.toggleListView = this.toggleListView.bind(this);
    }

    toggleListView(e) {
        e.preventDefault();
        this.setState({
            listView: !this.state.listView
        })
    }

    render() {
        return (
            <CardSectionWrapper>
                <MenuBar>
                    Results
                <ListViewBtn onClick={this.toggleListView}>List view</ListViewBtn>
                    <Sort>Sort <img src="../img/arrow.png" alt="" /></Sort>
                </MenuBar>
                <Cards listView={this.state.listView}>
                    <Card name={"Pizza Place"} imgUrl={"../img/cards/pizza.jpg"} price={'$'} rating={3.9} distance={7} />
                    <Card name={"Tommi's Burger Joint"} imgUrl={"../img/cards/burger.jpg"} price={'$$$'} rating={4.5} distance={7} />
                    <Card name={"Heno Heno"} imgUrl={"../img/cards/ramen.jpg"} price={'$$'} rating={4.9} distance={7} />
                </Cards>
            </CardSectionWrapper>
        )
    }
}


export default CardSection