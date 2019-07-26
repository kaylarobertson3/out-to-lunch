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

  // handleFilter = (filterTerms) => {
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

  handleFilter = (key, value) => {
    if (value == 'all') {
      this.setState({ data: data })
    } else {
      this.setState({
        data: data.filter(d => d[key] == value),
        searchTerms: value
      })
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
      </>
    )
  }
}

export default Home;
