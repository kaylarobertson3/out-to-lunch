import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json";

const cuisines = ["all"];

data.map((d) => {
  if (cuisines.indexOf(d.cuisine) == -1) cuisines.push(d.cuisine);
})

class Home extends React.Component<{}, { data: any, cuisines: Array<String>, cuisine: any, price: any, distance: any, selectedRestaurantId: any, searchTerms: any }> {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      cuisines: cuisines,
      cuisine: null,
      price: null,
      distance: null,
      selectedRestaurantId: null,
      searchTerms: null
    }
  }

  // handleFilter = (cuisineFilter, ) => {
  //   const { cuisine, price, distance } = filterTerms;

  //   console.log("filter terms index: ", cuisine, price, distance)
  //   const filteredData = data.filter(d => d.cuisine == cuisine);

  //   this.setState({
  //     data: filteredData
  //   })
  // }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ data: data })
  }

  handleFilter = (cuisineFilter, priceFilter, distanceFilter) => {
    const cuisineIndexNum = cuisineFilter == "any" ? -1 : 0
    const priceIndexNum = priceFilter == "any" ? -1 : 0
    const distanceIndexNum = distanceFilter == "any" ? -1 : 0

    console.log(cuisineFilter, priceFilter, distanceFilter)

    const filteredData = data.filter(d => {
      return (
        d.cuisine.indexOf(cuisineFilter) >= cuisineIndexNum
        && d.price.indexOf(priceFilter) >= priceIndexNum
        && d.distance.indexOf(distanceFilter) >= distanceIndexNum
      )
    })
    console.log("filteredData", filteredData)

    this.setState({
      data: filteredData
    })
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
    const min = 0;
    const max = data.length;
    var randomId = Math.floor(Math.random() * (+max - +min)) + +min;
    var randomResturant = data[randomId];
    console.log("randomId", randomId)
    console.log("randomResturant", randomResturant)
    this.setState({
      selectedRestaurantId: randomResturant
    })
  }

  handleSearch = (searchTerms) => {
    console.log("searching with: ", searchTerms);
  }

  render() {
    return (
      <>
        <Hero data={this.state.data} cuisines={cuisines} handleClick={this.handleFilter} handleReset={this.handleReset} />
        <CardSection
          sortDistance={this.handleSortDistance}
          sortAz={this.handleSortAz}
          sortRating={this.handleSortRating}
          cardData={this.state.data}
          searchTerms={this.state.searchTerms} />
        <SearchSection
          handleSearchClick={this.handleSearch}
          handleRandomizeClick={this.handleRandomize}
          randomId={this.state.selectedRestaurantId}
        />
        <a href="#top" id="bottom">
          Scroll to top!
      </a>
      </>
    )
  }
}

export default Home;
