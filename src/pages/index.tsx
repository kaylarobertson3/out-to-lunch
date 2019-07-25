import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json"

class Home extends React.Component<{}, { data: any, cuisine: any, price: any, distance: any, selectedRestaurantId: any }> {
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

  // handleFilter = (filterTerms) => {
  //   const { cuisine, price, distance } = filterTerms;

  //   console.log("filter terms index: ", cuisine, price, distance)
  //   const filteredData = data.filter(d => d.cuisine == cuisine);

  //   this.setState({
  //     data: filteredData
  //   })
  // }


  handleFilter = (key, value) => {
    if (value == 'all') {
      this.setState({ data: data })
    } else {
      this.setState({ data: data.filter(d => d[key] == value) })
    }
  }

  handleSortAz = () => {
    const sortedData = this.state.data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    this.setState({ data: sortedData })
  }

  handleSortRating = () => {
    const sortedData = this.state.data.sort((a, b) => {
      return b.rating - a.rating
    })
    this.setState({ data: sortedData })
  }

  handleSortDistance = () => {
    const sortedData = this.state.data.sort((a, b) => {
      return a.distance - b.distance
    })
    this.setState({ data: sortedData })
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
        <CardSection
          sortDistance={this.handleSortDistance}
          sortAz={this.handleSortAz}
          sortRating={this.handleSortRating}
          cardData={this.state.data} />
        <SearchSection
          handleSearchClick={this.handleSearch}
          handleRandomizeClick={this.handleRandomize} />
      </>
    )
  }
}

export default Home;
