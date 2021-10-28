import { Router } from '@reach/router';
import { BREAKPOINT, COLOR, FONT } from '@src/theme';
import React from 'react';
import { Helmet } from 'react-helmet';
import { addPrefetchExcludes, Root, Routes } from 'react-static';
import styled from 'styled-components';
import './app.css';

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
    padding: 2rem 0 0 0;
    ${BREAKPOINT.m`
      padding: 4rem 0 0 0;
  `};
  }
`;

const Content = styled.main`
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
addPrefetchExcludes(['dynamic']);

function App() {
  return (
    <Root>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Out To Lunch | IGG</title>
        <link rel="canonical" href="https://out-to-lunch.netlify.app/" />
      </Helmet>
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
