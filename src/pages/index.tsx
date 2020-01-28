import React from "react";
import Hero from "@components/Hero";
import CardSection from "@components/CardSection";
import SearchSection from "@components/SearchSection";
import dataUnsorted from "@src/data/data.json";
import {Events, scroller} from "react-scroll";
import Footer from "@components/Footer";
import {ANIMATION} from "@src/constants";
import {sortData} from "@src/utils/sort";

const data = dataUnsorted.sort((a, b) => {
  return b.rating - a.rating;
});

const cuisines = ["any"];

data.map(d => {
  const cuisine = d.cuisine.toLowerCase();
  const cuisine2 = d.cuisine2.toLowerCase();
  if (cuisine.length > 0 && cuisines.indexOf(cuisine) == -1) cuisines.push(cuisine);
  if (cuisine2.length > 0 && cuisines.indexOf(cuisine2) == -1) cuisines.push(cuisine2);
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
    sortParams: string;
    activePage: number;
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
      sortParams: "rating",
      activePage: 1,
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
      activePage: 1,
      query: "",
      resultsText: "All restaurants",
    });
  };

  scrollToCard = () => {
    scroller.scrollTo("cards", {
      duration: ANIMATION.duration,
      smooth: true,
      offset: -150,
    });
  };

  handleFilter = (cuisineFilter, priceFilter, distanceFilter) => {
    const cuisineConditional = d => {
      return (
        cuisineFilter === "any" ||
        d.cuisine.toLowerCase() === cuisineFilter ||
        d.cuisine2.toLowerCase() === cuisineFilter
      );
    };

    const priceConditional = d => {
      return priceFilter === "any" || Number(d.price) === Number(priceFilter);
    };

    const distanceConditional = d => {
      return distanceFilter === "any" || d.distanceMinutes <= distanceFilter;
    };

    const filteredData = data.filter(d => {
      return cuisineConditional(d) && priceConditional(d) && distanceConditional(d);
    });

    const cuisineText = () => {
      if (cuisineFilter == "any") return "Any cuisine";
      else return cuisineFilter;
    };

    const priceText = () => {
      if (priceFilter === "any") {
        return "Any price";
      } else if (priceFilter == 1) {
        return "$";
      } else if (priceFilter == 2) {
        return "$$";
      } else if (priceFilter == 3) {
        return "$$$";
      } else return "?";
    };

    const distanceText = () => {
      if (distanceFilter === "any") {
        return "Any distance";
      } else return `Under ${distanceFilter} min.`;
    };

    this.setState({
      data: filteredData,
      resultsText: cuisineText() + ", " + priceText() + ", " + distanceText(),
    });
  };

  updateSortParams = sortParams => {
    let sortedData;
    if (this.state.data.length >= 1) {
      sortedData = sortData(this.state.data, sortParams);
    } else sortedData = this.state.data;
    this.setState({data: sortedData, sortParams: sortParams});
  };

  handleRandomize = () => {
    this.scrollToCard();
    const min = 0;
    const max = data.length;
    const randomId = Math.floor(Math.random() * (+max - +min)) + +min;
    const randomResturant = [data[randomId]];

    this.setState({
      activePage: 1,
      data: randomResturant,
      resultsText: "Go to: " + randomResturant[0].name,
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
    const resultsText =
      filteredData.length >= 1
        ? `${filteredData.length} results for ${this.state.query}: `
        : `Sorry, no results for ${this.state.query}`;

    this.setState({
      data: filteredData,
      resultsText: resultsText,
    });
    this.scrollToCard();
  };

  handleInputChange = e => {
    this.setState({
      query: e,
    });
  };

  changeActivePage = newActivePage => {
    this.setState({activePage: newActivePage});
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
          activePage={this.state.activePage}
          changeActivePage={this.changeActivePage}
          query={this.state.query}
          cardData={this.state.data}
          resultsText={this.state.resultsText}
        />
        <SearchSection
          searchData={this.searchData}
          handleRandomizeClick={this.handleRandomize}
          handleReset={this.handleReset}
          handleInputChange={this.handleInputChange}
          query={this.state.query}
        />
        <Footer />
      </>
    );
  }
}

export default Home;
