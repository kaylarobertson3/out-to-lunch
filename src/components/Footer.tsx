import React from 'react'
import styled from "styled-components";
import { FONT, COLOR, BREAKPOINT } from "@src/theme";

const FooterContainer = styled.footer`
  margin-top: 4rem;
  min-height: 270px;
  background: ${COLOR.lightGray};
  color: ${COLOR.black};
  width: 100%;

  display: flex;
  justify-content: center;

  div  {
    padding: 2rem;
    width: 100%;
    max-width: 1100px;
    width: 100%;
    ${BREAKPOINT.m`
        padding: 3rem;
        margin-top: 5rem;
    `};
    }
`

class Footer extends React.PureComponent<{ scrollToTop: any }, {}>{
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <FooterContainer>
                <div>
                    <button onClick={this.props.scrollToTop}>Scroll to top</button>
                </div>
            </FooterContainer>
        )
    }
}
export default Footer
