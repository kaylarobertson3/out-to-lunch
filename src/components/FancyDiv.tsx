import React from "react";

interface FancyDivProps {
  children: JSX.Element;
}
const FancyDiv = ({ children }: FancyDivProps) => {
  return <div>{children}</div>;
};
export default FancyDiv;
