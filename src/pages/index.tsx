import React from "react";
import Hero from "@components/Hero"
import CardSection from "@components/CardSection"
import SearchSection from "@components/SearchSection"
// import data from "@src/data/data.json"

// console.log("data", data)

class Home extends React.Component<{}, {}>{

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("this.state", this.state);
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