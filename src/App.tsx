import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Link, Router } from '@reach/router'
import FancyDiv from '@components/FancyDiv'
import Dynamic from '@components/Dynamic'
import './app.css'
import styled from "styled-components";
import { FONT, COLOR } from "@src/theme";

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  h1 {
    font: normal 700 38px/1.2 ${FONT.sansSerif};
  }

  h2 {
    font: normal 700 30px/1.2 ${FONT.sansSerif};
    margin: 1rem 0;
  }
  p {
    font: normal 300 16px/23px ${FONT.sansSerif};
  }

  button, input {
    font: normal 300 16px/23px ${FONT.sansSerif};
    padding: 8px 10px;
    border: none;
  }

  button {
    cursor: pointer;
  }

  select {
    font: normal 300 16px/23px ${FONT.sansSerif};
    padding: 8px 10px;
  }

  a {
    color: ${COLOR.black};
    text-decoration: none;
  }
`
const Nav = styled.nav`
  padding: 1rem;

  a {
    margin-right: .5rem;
  }
`

const Content = styled.div`
  flex: 1;
  margin: 1rem;
`

const Footer = styled.footer`
  padding: 1rem;
`

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      <Site>
        <Nav>
          <Link to="/">Out to Lunch with IGG</Link>
        </Nav>
        <Content>
          <FancyDiv>
            <React.Suspense fallback={<em>Loading...</em>}>
              <Router>
                <Dynamic path="dynamic" />
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </FancyDiv>
        </Content>
        <Footer>
          footer
      </Footer>
      </Site>
    </Root>
  )
}

export default App
