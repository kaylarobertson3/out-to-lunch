import React from "react";
import styled from "styled-components";
import Card from "./Card"
import { COLOR } from "@src/theme";

const CardSectionWrapper = styled.section`
`

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
`
const MenuLeft = styled.div``

const MenuRight = styled.div``

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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
`

class CardSection extends React.Component<{
  cardData: any;
}, {
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
    const { cardData } = this.props;
    console.log("cardData", cardData)
    return (
      <CardSectionWrapper>
        <MenuBar>
          <MenuLeft>
            X Results
            <ListViewBtn onClick={this.toggleListView}>List view</ListViewBtn>
          </MenuLeft>
          <MenuRight>
            <Sort>Sort <img src="../img/arrow.png" alt="" /></Sort>
          </MenuRight>
        </MenuBar>

        <Cards listView={this.state.listView}>
          {cardData.map((d, i) => {
            console.log("d", d)
            return (
              < Card key={i} name={d.name} imgUrl={`../img/cards/${d.imgUrl}`} price={d.price} rating={d.rating} distance={d.distance} />
            )
          })}
        </Cards>
      </CardSectionWrapper>
    )
  }
}


export default CardSection
