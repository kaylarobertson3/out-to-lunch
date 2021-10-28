import React, {useEffect} from "react";
import styled from "styled-components";
import {COLOR, BREAKPOINT} from "@src/theme";
import scrollIcon from "@public/assets/icons/top.svg";
import {animateScroll as scroll, Events} from "react-scroll";
import {ANIMATION} from "@src/constants";

const FooterStyled = styled.footer`
  margin-top: 5rem;
  color: ${COLOR.black};
  width: 100%;
  font-size: 0.8rem;
`;

const FooterInner = styled.div`
  width: 100%;
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
  cursor: pointer;
`;

const Footer = () => {
  useEffect(() => {
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end");
    });
    return () => {
      Events.scrollEvent.remove("end");
    };
  });

  function scrollToTop() {
    scroll.scrollToTop({
      duration: ANIMATION.duration,
      smooth: true,
    });
  }

  return (
    <FooterStyled>
      <FooterInner>
        <FooterRight>
          <h6>Created at Sapera in 2019</h6>
        </FooterRight>
        <ScrollTopBtn onClick={scrollToTop} aria-label="scroll to top of page">
          <img src={scrollIcon} alt="" />
        </ScrollTopBtn>
      </FooterInner>
    </FooterStyled>
  );
};

export default Footer;
