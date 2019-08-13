import React from "react";
import Hero from "@components/Hero";
import CardSection from "@components/CardSection";
import SearchSection from "@components/SearchSection";
import dataUnsorted from "@src/data/data.json";
import { Events, scroller } from "react-scroll";
import Footer from "@components/Footer";
import { ANIMATION } from "@src/constants";
import { sortData } from "@src/utils/sort";
import { string } from "prop-types";

// import Tabletop from 'tabletop'
// const APIKEY = '14nDLj6C9YGOH_oaO6yr7C1dzTSAF3SO4WLBt2DM5l2o';

const data = dataUnsorted.sort((a, b) => {
  return b.rating - a.rating;
});

const cuisines = ["any"];

data.map(d => {
  const cuisine = d.cuisine.toLowerCase();
  if (cuisines.indexOf(cuisine) == -1) cuisines.push(cuisine);
});

class Home extends React.Component<
  {},
  {
    data: any;
    cuisines?: Array<String>;
    cuisine?: any;
    price?: any;
    distance?: any;
    query: any;
    resultsText: string;
    isReset: boolean;
    sortParams: string;
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
      isReset: false,
      sortParams: "rating"
    };
  }

  componentDidMount = () => {
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end");
    });
  };

  componentWillUnmount = () => {
    Events.scrollEvent.remove("end");
  };

  handleReset = e => {
    e.preventDefault();
    this.updateSortParams("rating");
    this.setState({
      data: data,
      query: "",
      isReset: true,
      resultsText: "All restaurants"
    });
  };

  scrollToCard = () => {
    scroller.scrollTo("cards", {
      duration: ANIMATION.duration,
      smooth: true,
      offset: -150
    });
  };

  handleFilter = (cuisineFilter, priceFilter, distanceFilter) => {
    const cuisineIndexNum = cuisineFilter == "any" ? -1 : 0;
    const distanceIndexNum = distanceFilter == "any" ? 100 : distanceFilter;
    const priceIndexNum = priceFilter == "any" ? 3 : priceFilter;
    const filteredData = data.filter(d => {
      const cuisineTags = [d.cuisine.toLowerCase(), d.cuisine2.toLowerCase()];
      return (
        d.cuisine.toLowerCase().indexOf(cuisineFilter) >= cuisineIndexNum ||
        (d.cuisine2.toLowerCase().indexOf(cuisineFilter) >= cuisineIndexNum &&
          d.price <= priceIndexNum &&
          d.distance <= distanceIndexNum)
      );
    });

    const cuisineText = () => {
      if (cuisineFilter == "any") return "Any cuisine";
      else return cuisineFilter;
    };

    const priceText = () => {
      if (priceFilter === "any") {
        return "Any price";
      } else if (priceFilter == 1) {
        return "under $";
      } else if (priceFilter == 2) {
        return "under $$";
      } else if (priceFilter == 3) {
        return "under $$$";
      } else return "?";
    };

    const distanceText = () => {
      if (distanceFilter === "any") {
        return "Any distance";
      } else return `Under ${distanceFilter} min.`;
    };

    this.setState({
      data: filteredData,
      resultsText: cuisineText() + ", " + priceText() + ", " + distanceText()
    });
  };

  updateSortParams = sortParams => {
    let sortedData;
    if (this.state.data.length >= 1) {
      sortedData = sortData(this.state.data, sortParams);
    } else sortedData = this.state.data;
    this.setState({ data: sortedData, sortParams: sortParams });
  };

  handleRandomize = () => {
    this.scrollToCard();
    const min = 0;
    const max = data.length;
    var randomId = Math.floor(Math.random() * (+max - +min)) + +min;
    var randomResturant = [data[randomId]];

    this.setState({
      data: randomResturant,
      resultsText: "Go to: " + randomResturant[0].name
    });
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
          updateSortParams={this.updateSortParams}
          sortParams={this.state.sortParams}
          query={this.state.query}
          cardData={this.state.data}
          resultsText={this.state.resultsText}
          isReset={this.state.isReset}
        />
        <SearchSection
          searchData={this.searchData}
          handleRandomizeClick={this.handleRandomize}
          handleInputChange={this.handleInputChange}
          query={this.state.query}
        />
        <Footer />
      </>
    );
  }
}

export default Home;
