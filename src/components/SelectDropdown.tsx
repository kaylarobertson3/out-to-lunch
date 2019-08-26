import * as React from "react";
import styled, { css } from "styled-components";
import { COLOR, BREAKPOINT, FONT } from "@src/theme";
import arrowIcon from "@public/assets/icons/arrow.png";

const Select = styled.select<{ isBorderStyle?: boolean }>`
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid ${COLOR.black};
  padding: 0.6em 1.4em 0.5em 0.8em;
  border-radius: 0;
  appearance: none;
  background-image: url(${arrowIcon});
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin: 0 1rem;
  width: 160px;
  font: normal 500 16px/23px ${FONT.sansSerif};

  ${BREAKPOINT.m`
    font-size: 20px;
  `};

  ::-ms-expand {
    display: none;
  }

  :hover {
    border-color: #888;
  }

  :focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  option {
    font-weight: normal;
  }

  /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"],
  :root:lang(ar),
  :root:lang(iw) {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  }

  /* Disabled styles */
  :disabled,
  [aria-disabled="true"] {
    color: graytext;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  }
  :disabled:hover,
  [aria-disabled="true"] {
    border-color: #aaa;
  }

  ${p =>
    p.isBorderStyle &&
    css`
      border: 1px solid ${COLOR.black};
      border-radius: 5px;
      width: auto;
      min-width: 160px;
      padding: 5px 30px 5px 8px;
      margin: 0;

      ${BREAKPOINT.m`
        font-size: 16px;
        `};
    `};
`;

const Label = styled.label`
  font: normal 500 16px/23px ${FONT.sansSerif};
  ${BREAKPOINT.m`
    font-size: 20px;
    width: 100%;
  `};
`;

interface SelectDropdownProps {
  className?: string;
  name: string;
  label?: string;
  value: string | number;
  options: any[];
  handleChange: (value: any) => void;
  isBorderStyle?: boolean;
}

class SelectDropdown extends React.PureComponent<SelectDropdownProps> {
  constructor(props: SelectDropdownProps) {
    super(props);
  }
  render() {
    const {
      className,
      name,
      label,
      value,
      options,
      handleChange,
      isBorderStyle
    } = this.props;
    return (
      <div className={className}>
        <Label htmlFor={name}>{label}</Label>
        <Select
          name={name}
          value={value}
          onChange={handleChange}
          isBorderStyle={isBorderStyle}
        >
          {options.map((opt, i) => {
            return (
              <option key={`${value}-${i}`} value={opt.value ? opt.value : opt}>
                {opt.name ? opt.name : opt}
              </option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default SelectDropdown;
