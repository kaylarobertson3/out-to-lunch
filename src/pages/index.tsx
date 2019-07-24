import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json"

class Home extends React.Component<{}, { data: Object, cuisine: any, price: any, distance: any }>{
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      cuisine: null,
      price: null,
      distance: null
    }
  }

  handleSubmit = (filterTerms) => {
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

  render() {


    return (
      <>
        <Hero handleClick={this.handleSubmit} />
        <CardSection cardData={this.state.data} />
        <SearchSection />
      </>
    )
  }
}

export default Home;
