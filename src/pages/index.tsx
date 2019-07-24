import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json"

// console.log("data", data)

class Home extends React.Component<{}, { data: Object }>{
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      // cuisine: null,
      // price: null,
      // distance: null
    }
  }

  handleSubmit = (stuff) => {
    console.log("stuff,", stuff)
  }

  render() {

    return (
      <>
        <Hero handleClick={this.handleSubmit} />
        <CardSection />
        <SearchSection />
      </>
    )
  }
}




export default Home;