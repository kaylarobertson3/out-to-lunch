import React from "react";
import styled from "styled-components";
import { FONT, COLOR, BREAKPOINT } from "@src/theme";
import scrollIcon from "@src/icons/top.svg";

const Footer = styled.footer`
  margin-top: 4rem;
  color: ${COLOR.black};
  width: 100%;
  font-size: 0.9rem;
  /* display: flex;
  justify-content: center; */
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

const FooterRight = styled.div``;

const ScrollTopBtn = styled.button`
  background: none;
`;

export default class extends React.PureComponent<{ scrollToTop: any }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
        <FooterInner>
          <ScrollTopBtn onClick={this.props.scrollToTop}>
            <img src={scrollIcon} alt="scroll to top" />
          </ScrollTopBtn>
          <FooterRight>Infographics Group | About | Contact</FooterRight>
        </FooterInner>
      </Footer>
    );
  }
}
