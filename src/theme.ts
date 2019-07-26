import styledBreakpoint from "@humblebee/styled-components-breakpoint";

export const COLOR = {
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#F2F2F2",
  darkGray: "#4C4C4C",
  gray2: '#AAAAAF',
  lightBlue: '#B6D5D8',
  red: '#C42C1B'
};

export const BREAKPOINT = styledBreakpoint({
  xxs: 0,
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
});

export const FONT = {
  sansSerif: '"Roboto", sans-serif',
  serif: '"Playfair Display", serif',
};

export const HEADING_MOBILE = {
  h1: 38,
  h2: 30,
  h3: 19,
  h4: 16,
  p: 16,
};

export const HEADING_DESKTOP = {
  h1: 75,
  h2: 57,
  h3: 27,
  h4: 19,
  p: 19,
};
