import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json"
import { any } from "prop-types";

class Home extends React.Component<{}, { data: Object, cuisine: any, price: any, distance: any, selectedRestaurantId: any }>{
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      cuisine: null,
      price: null,
      distance: null,
      selectedRestaurantId: null
    }
  }

  handleFilter = (filterTerms) => {
    const { cuisine, price, distance } = filterTerms;

    let filteredData;
    if (cuisine !== null) {
      const filteredData = data.filter(d => d.cuisine == this.state.cuisine);
    } else filteredData = data

    this.setState({
      // data: filteredData
      cuisine: cuisine,
      price: price,
      distance: distance
    })
  }

  handleRandomize = () => {
    console.log("randomizing based on all data")
    const random = data[0];
    console.log("data.length", data.length);
    this.setState({
      selectedRestaurantId: data[0]
    })
  }

  handleSearch = (searchTerms) => {
    console.log("searching with: ", searchTerms)
  }

  render() {


    return (
      <>
        <Hero handleClick={this.handleFilter} />
        <CardSection cardData={this.state.data} />
        <SearchSection handleSearchClick={this.handleSearch} handleRandomizeClick={this.handleRandomize} />
      </>
    )
  }
}

export default Home;
