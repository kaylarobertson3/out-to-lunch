import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Link, Router } from '@reach/router'
import FancyDiv from '@components/FancyDiv'
import Dynamic from '@components/Dynamic'
import './app.css'
import styled from "styled-components";
import { FONT, COLOR, BREAKPOINT } from "@src/theme";

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  h1 {
    font: normal 700 38px/1.2 ${FONT.serif};
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
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: .9em;

  svg {
    height: 30px;
    margin-right: 1rem;
  }
`

const Content = styled.div`
  flex: 1;
  margin: 0 1rem;
  max-width: 1000px;
  align-self: center;
`

const Footer = styled.footer`
  padding: 1rem;
  margin-top: 3rem;
  min-height: 200px;
  background: ${COLOR.lightGray};
  color: ${COLOR.black};

  ${BREAKPOINT.m`
        padding: 3rem;
    `};


`

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      <Site>
        <Nav>
          <svg viewBox="0 0 9 32">
            <path d="M4.391 9.007c-.869 0-1.718-.26-2.44-.747A4.424 4.424 0 0 1 .335 6.271a4.471 4.471 0 0 1 .952-4.831A4.354 4.354 0 0 1 6.07.48a4.4 4.4 0 0 1 1.971 1.632 4.462 4.462 0 0 1-.547 5.595 4.388 4.388 0 0 1-3.104 1.3zm0-7.21c-.545 0-1.077.162-1.53.467-.452.306-.805.74-1.012 1.247a2.803 2.803 0 0 0 .596 3.028 2.734 2.734 0 0 0 4.235-.421 2.797 2.797 0 0 0-.343-3.507 2.745 2.745 0 0 0-1.945-.815zm.006 29.748a4.398 4.398 0 0 1-2.94-1.13 4.608 4.608 0 0 1-.363-6.32l1.704-2.035a1.024 1.024 0 0 0 0-1.277l-1.704-2.036a4.608 4.608 0 0 1 .363-6.32 4.398 4.398 0 0 1 2.94-1.13 4.418 4.418 0 0 1 2.939 1.13 4.608 4.608 0 0 1 .363 6.32l-1.704 2.036a1.023 1.023 0 0 0 0 1.277l1.704 2.035a4.608 4.608 0 0 1-.363 6.32 4.418 4.418 0 0 1-2.94 1.13zm0-1.654c.684 0 1.344-.254 1.854-.712a2.929 2.929 0 0 0 .197-4.02l-1.704-2.035a2.55 2.55 0 0 1-.348-.535 2.71 2.71 0 0 1-.363.52L2.33 25.143a2.928 2.928 0 0 0 .192 4.036c.51.458 1.171.711 1.855.712h.02zm0-16.97a2.783 2.783 0 0 0-1.876.712 2.928 2.928 0 0 0-.191 4.02l1.703 2.035c.135.165.25.344.343.535.094-.193.21-.372.348-.535l1.704-2.035a2.928 2.928 0 0 0-.196-4.02 2.783 2.783 0 0 0-1.85-.712h.015z" fill={COLOR.black}></path>
          </svg>
          <Link to="/">IGG out to lunch</Link>
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
