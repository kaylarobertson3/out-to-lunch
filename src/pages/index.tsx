import React from "react";
import Hero from "@components/Hero";
import CardSection from "@components/CardSection";
import SearchSection from "@components/SearchSection";
import dataUnsorted from "@src/data/data.json";
import { Events, scroller } from "react-scroll";
import Footer from "@components/Footer";
import { ANIMATION } from "@src/constants";
import { sortData } from "@src/utils/sort";

// import Tabletop from 'tabletop'
// const APIKEY = '14nDLj6C9YGOH_oaO6yr7C1dzTSAF3SO4WLBt2DM5l2o';

// const ratingAccessor = d => d.rating;

// const data = sortData(dataUnsorted, ratingAccessor);

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
    cuisines?: Array<String>;
    cuisine?: any;
    price?: any;
    distance?: any;
    query: any;
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
      resultsText: "All restaurants"
    };
  }

  componentDidMount = () => {
    Events.scrollEvent.register("end", (to, element) => {
      // console.log("end");
    });
  };

  componentWillUnmount = () => {
    Events.scrollEvent.remove("end");
  };

  handleReset = e => {
    e.preventDefault();
    this.setState({
      data: data,
      query: "",
      resultsText: "All restaurants"
    });
  };

  scrollToCard = () => {
    scroller.scrollTo("cards", {
      duration: ANIMATION.duration,
      smooth: true,
      offset: -50
    });
  };

  // handleFilter = (param, name) => {
  //   console.log("param and name:", param, name);

  //   if (param === "any") {

  //   }

  // const cuisineIndexNum = cuisineFilter == "any" ? -1 : 0;
  // const distanceIndexNum = distanceFilter == "any" ? 100 : distanceFilter;
  // const priceIndexNum = priceFilter == "any" ? -1 : 0;
  // const filteredData = data.filter(d => {
  //   return (
  //     d.cuisine.indexOf(cuisineFilter) >= cuisineIndexNum &&
  //     d.price.indexOf(priceFilter) >= priceIndexNum &&
  //     d.distance <= distanceIndexNum
  //     // d.distance.indexOf(distanceFilter) >= distanceIndexNum
  //   );
  // });
  // this.setState({
  //   data: filteredData,
  //   resultsText: cuisineFilter + " ," + priceFilter + ", " + distanceFilter
  // });
  // };

  handleFilter = (cuisineFilter, priceFilter, distanceFilter) => {
    const cuisineIndexNum = cuisineFilter == "any" ? -1 : 0;
    const distanceIndexNum = distanceFilter == "any" ? 100 : distanceFilter;
    const priceIndexNum = priceFilter == "any" ? 3 : priceFilter;
    const filteredData = data.filter(d => {
      return (
        d.cuisine.indexOf(cuisineFilter) >= cuisineIndexNum &&
        d.price <= priceIndexNum &&
        d.distance <= distanceIndexNum
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
    this.setState({ data: sortedData });
  };

  // handleSortRating = () => {
  //   let sortedData;
  //   if (this.state.data.length >= 1) {
  //     sortedData = this.state.data.sort((a, b) => {
  //       return b.rating - a.rating;
  //     });
  //   } else sortedData = this.state.data;

  //   this.setState({ data: sortedData });
  // };

  // handleSortDistance = () => {
  //   let sortedData;
  //   if (this.state.data.length >= 1) {
  //     sortedData = this.state.data.sort((a, b) => {
  //       return a.distance - b.distance;
  //     });
  //   } else sortedData = this.state.data;
  //   this.setState({ data: sortedData });
  // };

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
          updateSortParams={this.updateSortParams}
          query={this.state.query}
          cardData={this.state.data}
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
        <Footer />
      </>
    );
  }
}

export default Home;
