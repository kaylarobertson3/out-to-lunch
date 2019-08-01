import React from "react";
import Hero from "@components/Hero";
import CardSection from "@components/CardSection";
import SearchSection from "@components/SearchSection";
import dataUnsorted from "@src/data/data.json";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import { string } from "prop-types";
import Footer from "@components/Footer";

// import Tabletop from 'tabletop'
// const apiKey = '14nDLj6C9YGOH_oaO6yr7C1dzTSAF3SO4WLBt2DM5l2o';

const data = dataUnsorted.sort((a, b) => {
  return b.rating - a.rating;
});

const cuisines = ["any"];

data.map(d => {
  if (cuisines.indexOf(d.cuisine) == -1) cuisines.push(d.cuisine);
});

class Home extends React.Component<
  {},
  {
    data: any;
    cuisines: Array<String>;
    cuisine: any;
    price: any;
    distance: any;
    query: any;
    sortTerms: string;
    resultsText: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      cuisines: cuisines,
      cuisine: null,
      price: null,
      distance: null,
      query: "",
      resultsText: "All restaurants",
      sortTerms: "Highest Rated"
    };
  }

  // componentDidMount() {
  //   Tabletop.init({
  //     key: apiKey,
  //     callback: googleData => {
  //       console.log("google sheet dadta --->", googleData)
  //     },
  //     simpleSheet: true
  //   })
  // }

  handleReset = e => {
    e.preventDefault();
    this.setState({
      data: data,
      query: "",
      sortTerms: "Highest Rated",
      resultsText: "All restaurants"
    });
  };

  scrollToTop = () => {
    scroll.scrollTo("0", {
      duration: 400,
      delay: 0,
      smooth: true
    });
  };

  scrollToCard = () => {
    scroller.scrollTo("cards", {
      duration: 400,
      delay: 0,
      smooth: true,
      offset: -50
    });
  };

  handleFilter = (cuisineFilter, priceFilter, distanceFilter) => {
    const cuisineIndexNum = cuisineFilter == "any" ? -1 : 0;
    const priceIndexNum = priceFilter == "any" ? -1 : 0;
    const distanceIndexNum = distanceFilter == "any" ? -1 : 0;
    const filteredData = data.filter(d => {
      return (
        d.cuisine.indexOf(cuisineFilter) >= cuisineIndexNum &&
        d.price.indexOf(priceFilter) >= priceIndexNum &&
        d.distance.indexOf(distanceFilter) >= distanceIndexNum
      );
    });
    this.setState({
      data: filteredData,
      resultsText: cuisineFilter + " ," + priceFilter + ", " + distanceFilter
    });
  };

  handleSortAz = () => {
    let sortedData;
    if (this.state.data.length >= 1) {
      sortedData = this.state.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else sortedData = this.state.data;
    this.setState({ data: sortedData, sortTerms: "A - Z" });
  };

  handleSortRating = () => {
    let sortedData;
    if (this.state.data.length >= 1) {
      sortedData = this.state.data.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else sortedData = this.state.data;

    this.setState({ data: sortedData, sortTerms: "Highest Rated" });
  };

  handleSortDistance = () => {
    let sortedData;
    if (this.state.data.length >= 1) {
      sortedData = this.state.data.sort((a, b) => {
        return a.distance - b.distance;
      });
    } else sortedData = this.state.data;

    this.setState({ data: sortedData, sortTerms: "Closest" });
  };

  handleRandomize = () => {
    this.scrollToCard();
    const min = 0;
    const max = data.length;
    var randomId = Math.floor(Math.random() * (+max - +min)) + +min;
    var randomResturant = data[randomId];

    this.setState({
      resultsText: "Go to: " + randomResturant.name,
      data: randomResturant
    });

    console.log("query:", this.state.query);
    console.log("test:", "Go to: " + randomResturant);
  };

  searchData = () => {
    const queryLower = this.state.query.toLowerCase();
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key => {
        if (item[key]) {
          if (item[key])
            return item[key]
              .toString()
              .toLowerCase()
              .includes(queryLower);
        }
      });
    });

    this.setState({
      data: filteredData,
      resultsText: `Results for ${this.state.query}: `
    });
    this.scrollToCard();
  };

  handleInputChange = e => {
    this.setState({
      query: e
    });
    // Keep this if back to search on input
    // , () => {
    //   if (this.state.query && this.state.query.length >= 0) {
    //     this.searchData()
    //   }
    // })
  };

  render() {
    return (
      <>
        <Hero
          data={this.state.data}
          cuisines={cuisines}
          handleClick={this.handleFilter}
          handleReset={this.handleReset}
        />
        <CardSection
          sortDistance={this.handleSortDistance}
          sortAz={this.handleSortAz}
          query={this.state.query}
          sortRating={this.handleSortRating}
          cardData={this.state.data}
          sortTerms={this.state.sortTerms}
          resultsText={this.state.resultsText}
        />
        <SearchSection
          searchData={this.searchData}
          handleRandomizeClick={this.handleRandomize}
          handleInputChange={this.handleInputChange}
          query={this.state.query}
        />
        {/* <Link
          activeClass="active"
          to="top"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Section 1
              </Link> */}
        <Footer scrollToTop={this.scrollToTop} />
      </>
    );
  }
}

export default Home;
