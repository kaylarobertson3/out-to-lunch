import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Link, Router } from "@reach/router";
import FancyDiv from "@components/FancyDiv";
import "./app.css";
import styled from "styled-components";
import { FONT, COLOR, BREAKPOINT } from "@src/theme";
import logo from "@src/icons/igg-logo.svg";

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  h1 {
    font: normal 700 38px/1.2 ${FONT.sansSerif};
    margin-bottom: 2rem;

    ${BREAKPOINT.m`
    font: normal 700 50px/1.2 ${FONT.sansSerif};
   `};
  }

  h2 {
    font: normal 700 30px/1.2 ${FONT.sansSerif};
  }

  p {
    font: normal 300 16px/23px ${FONT.sansSerif};
  }

  button,
  input {
    font: normal 300 16px/23px ${FONT.sansSerif};
    padding: 8px 10px;
    border: none;
    border-radius: 0.5rem;
  }

  button {
    cursor: pointer;
  }

  select {
    padding: 5px 0;
    color: ${COLOR.black};
  }

  a {
    color: ${COLOR.black};
    text-decoration: none;
  }

  section {
    padding: 0 0 4rem 0;
  }
`;

const Nav = styled.nav`
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  div {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 2000px;
    width: 100%;

    ${BREAKPOINT.m`
        padding: 2rem 3rem;
    `};

    img {
      width: 100px;
      margin-right: 1rem;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 2rem;
  max-width: 2000px;
  max-width: 100%;
  align-self: center;

  ${BREAKPOINT.m`
        padding: .5rem 3rem 2rem 3rem;
    `};
`;

// const Footer = styled.footer`
//   margin-top: 4rem;
//   min-height: 270px;
//   background: ${COLOR.lightGray};
//   color: ${COLOR.black};
//   width: 100%;

//   display: flex;
//   justify-content: center;

//   div {
//     padding: 2rem;
//     width: 100%;
//     max-width: 1300px;
//     width: 100%;
//     ${BREAKPOINT.m`
//         padding: 3rem;
//         margin-top: 5rem;
//     `};
//   }
// `;

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <Site>
        <Nav>
          <div>
            <a href="/">
              <img src={logo} alt="infographics logo" />
            </a>
          </div>
        </Nav>
        <Content>
          <FancyDiv>
            <React.Suspense fallback={<em>Loading...</em>}>
              <Router>
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </FancyDiv>
        </Content>
      </Site>
    </Root>
  );
}

export default App;
