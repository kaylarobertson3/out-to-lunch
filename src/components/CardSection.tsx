import React from "react";
import styled from "styled-components";
import Card from "./Card"
import { COLOR } from "@src/theme";

const CardSectionWrapper = styled.section`
`

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
const MenuLeft = styled.div``

const MenuRight = styled.div``

const ListViewBtn = styled.button`
    background: none;
`

const SortDropdown = styled.div`
    position: absolute;
    z-index: 1;
    background: ${COLOR.lightGray};
    padding: 8px 10px;

    p {
      margin: .5rem 0;
      cursor: pointer;

      :hover {
        color: ${COLOR.darkGray};
      }
    }
  `

const Sort = styled.button`
    color: ${COLOR.black};
    background: none;
    img {
      margin: 0 0 0 5px;
    }
`
const SortTerms = styled.span`
  font-weight: 500;
`

const Cards = styled.div<{ listView: boolean }>`
    display: ${props => props.listView ? "block" : "grid"};
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 35px 20px;
    align-items: stretch;
`

class CardSection extends React.Component<{
  cardData: any;
  sortAz: any;
  sortRating: any;
  sortDistance: any;
  searchTerms: string;
  sortTerms: string;
}, {
  listView: boolean;
  showOptions: boolean;
}>{
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      showOptions: false
    }
    this.toggleListView = this.toggleListView.bind(this);
    this.showSortOptions = this.showSortOptions.bind(this);
  }

  toggleListView(e) {
    e.preventDefault();
    this.setState({
      listView: !this.state.listView
    })
  }

  showSortOptions(e) {
    e.preventDefault();
    this.setState({
      showOptions: !this.state.showOptions
    })
  }


  render() {
    const { cardData, sortAz, sortRating, sortDistance, searchTerms, sortTerms } = this.props;
    const listViewText = this.state.listView ? "Grid View" : "List View";
    const resultsText = "Results for: " + searchTerms + ":"
    console.log("cardData.length", cardData.length)
    console.log("cardData", cardData)
    return (
      <CardSectionWrapper>
        <MenuBar>
          <MenuLeft>
            {resultsText}
          </MenuLeft>
          <MenuRight>
            <ListViewBtn onClick={this.toggleListView}>
              {listViewText}
            </ListViewBtn>
            <Sort onClick={this.showSortOptions}>Sort by: <SortTerms>{sortTerms}</SortTerms> <img src="../img/arrow.png" alt="" /></Sort>
            {this.state.showOptions &&
              <SortDropdown>
                <p onClick={(e) => { e.preventDefault; this.setState({ showOptions: false }); sortRating(); }}>highest rated</p>
                <p onClick={(e) => { e.preventDefault; this.setState({ showOptions: false }); sortDistance(); }}>closest</p>
                <p onClick={(e) => { e.preventDefault; this.setState({ showOptions: false }); sortAz(); }}>A-Z</p>
              </SortDropdown>
            }
          </MenuRight>
        </MenuBar>

        <Cards listView={this.state.listView}>
          {cardData.length == 0 &&
            <p>
              sorry, no results
            </p >
          }
          {!cardData.length &&
            <Card listView={this.state.listView} name={cardData.name} imgUrl={`../img/cards/${cardData.imgUrl}`} price={cardData.price} rating={cardData.rating} distance={cardData.distance} description={cardData.description} />
          }
          {cardData.length > 1 &&
            cardData.map((d, i) => {
              return (
                <Card listView={this.state.listView} key={i} name={d.name} imgUrl={`../img/cards/${d.imgUrl}`} price={d.price} rating={d.rating} distance={d.distance} description={d.description} />
              )
            })
          }
        </Cards>
      </CardSectionWrapper>
    )
  }
}


export default CardSection
