import React from "react";
import styled from "styled-components";
import { BREAKPOINT, FONT, COLOR } from "@src/theme";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

class Pagination extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;

    return (
      <>
        <PaginationWrapper>page 1, 2, 3</PaginationWrapper>
      </>
    );
  }
}

export default Pagination;
