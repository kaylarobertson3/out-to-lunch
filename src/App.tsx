import React from "react";
import {Root, Routes, addPrefetchExcludes} from "react-static";
import {Router} from "@reach/router";
import "./app.css";
import styled from "styled-components";
import {FONT, COLOR, BREAKPOINT} from "@src/theme";

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
    border: 1px solid ${COLOR.black};
  }

  button {
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }

  select {
    cursor: pointer;
    color: ${COLOR.black};
    min-width: 150px;

    :hover {
      opacity: 0.7;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  section {
    padding: 4rem 0 0 0;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 2rem 1rem 2rem;
  max-width: 2000px;
  width: 100%;
  align-self: center;

  ${BREAKPOINT.m`
        padding: .5rem 3rem 2rem 3rem;
    `};
`;

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <Site>
        <Content>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </Content>
      </Site>
    </Root>
  );
}

export default App;
