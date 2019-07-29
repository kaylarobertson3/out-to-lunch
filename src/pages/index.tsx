import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json";

const cuisines = ["any"];

data.map((d) => {
  if (cuisines.indexOf(d.cuisine) == -1) cuisines.push(d.cuisine);
})

class Home extends React.Component<{}, { data: any, cuisines: Array<String>, cuisine: any, price: any, distance: any, searchTerms: any, sortTerms: string }> {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      cuisines: cuisines,
      cuisine: null,
      price: null,
      distance: null,
      searchTerms: null,
      sortTerms: "Highest Rated"
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
    console.log("sorting a to z");
    const sortedData = this.state.data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    this.setState({ data: sortedData, sortTerms: "A - Z" })
  }

  handleSortRating = () => {
    console.log("sorting rating");
    const sortedData = this.state.data.sort((a, b) => {
      return b.rating - a.rating
    })
    this.setState({ data: sortedData, sortTerms: "Highest Rated" })
  }

  handleSortDistance = () => {
    console.log("sorting distance");
    const sortedData = this.state.data.sort((a, b) => {
      return a.distance - b.distance
    })
    console.log("sortedData", sortedData)
    this.setState({ data: sortedData, sortTerms: "Closest" })

  }

  handleRandomize = () => {
    // TODO: scroll back to #top
    const min = 0;
    const max = data.length;
    var randomId = Math.floor(Math.random() * (+max - +min)) + +min;
    var randomResturant = data[randomId];

    this.setState({
      data: randomResturant
    })

    console.log("randomresturant", randomResturant)
  }

  handleSearch = (searchTerms) => {
    console.log("searching with: ", searchTerms);
  }

  render() {
    console.log("this.state.data", this.state.data)
    return (
      <>
        <Hero data={this.state.data} cuisines={cuisines} handleClick={this.handleFilter} handleReset={this.handleReset} />
        <CardSection
          sortDistance={this.handleSortDistance}
          sortAz={this.handleSortAz}
          sortRating={this.handleSortRating}
          cardData={this.state.data}
          sortTerms={this.state.sortTerms}
          searchTerms={this.state.searchTerms} />
        <SearchSection
          handleSearchClick={this.handleSearch}
          handleRandomizeClick={this.handleRandomize}
        />
        <a href="#top" id="bottom">
          Scroll to top!
      </a>
      </>
    )
  }
}

export default Home;
