import React from "react";
import styled from "styled-components";
import { FONT, COLOR, BREAKPOINT } from "@src/theme";
import scrollIcon from "@src/icons/top.svg";
import { animateScroll as scroll, Events } from "react-scroll";
import { ANIMATION } from "@src/constants";

const Footer = styled.footer`
  margin-top: 4rem;
  color: ${COLOR.black};
  width: 100%;
  font-size: 0.8rem;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 1100px;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${BREAKPOINT.m`
	margin-top: 0;
    `};
`;

const FooterRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  h6 {
    line-height: 1.5;
    font-size: 0.9rem;
    font-weight: 300;
    margin: 0.5rem;
  }
`;

const ScrollTopBtn = styled.button`
  background: none;
  display: flex;
  align-items: center;
`;

export default class extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    Events.scrollEvent.register("end", (to, element) => {
      // console.log("end");
    });
  };

  componentWillUnmount = () => {
    Events.scrollEvent.remove("end");
  };

  scrollToTop = () => {
    scroll.scrollToTop({
      duration: ANIMATION.duration,
      smooth: true
    });
  };

  render() {
    return (
      <Footer>
        <FooterInner>
          <ScrollTopBtn onClick={this.scrollToTop}>
            <img src={scrollIcon} alt="scroll to top" />
          </ScrollTopBtn>
          <FooterRight>
            <h6>Infographics Group </h6>
            <h6>About </h6>
            <h6>Contact </h6>
            <h6>Photos courtesy of... </h6>
          </FooterRight>
        </FooterInner>
      </Footer>
    );
  }
}
