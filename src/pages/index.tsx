import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
import data from "@src/data/data.json"

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
    //filter data based on stuff, then pass to card section
  }

  render() {
    return (
      <>
        <Hero handleClick={this.handleSubmit} />
        <CardSection cardData={data} />
        <SearchSection />
      </>
    )
  }
}

export default Home;
