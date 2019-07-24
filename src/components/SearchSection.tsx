import React from "react";
import styled from "styled-components";
import { COLOR } from "../theme";

const SearchSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Section = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
`

const SearchButton = styled.button`
    margin-top: 1rem;
    background: ${COLOR.black};
    color: ${COLOR.white};
    width: 100%;
`

const RandomizeButton = styled.button`
    margin-top: 2rem;
    background: ${COLOR.black};
    color: ${COLOR.white};
    width: 100%;
`

const Input = styled.input`
    margin-top: 2rem;
    width: 100%;
`


class Comp extends React.Component<{
    // handleSubmit: () => any;
}> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = (e) => {
        const val = e.target.value.value
        console.log("e.val", val)
        e.preventDefault();
    }

    handleRandomSubmit = () => {
        alert("random clicked")
    }

    render() {
        return (
            <SearchSection>
                <Section>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Looking for something specific?</h2>
                        <p>Search for a resturant by name</p>
                        <Input name="value" placeholder="Heno Heno..." />
                        <SearchButton>Search</SearchButton>
                    </form>
                </Section>
                <Section>
                    <h2>Can't decide?</h2>
                    <p>Click the randomize button and we’ll choose a random resturant for you.</p>
                    <RandomizeButton onClick={this.handleRandomSubmit}>Randomize</RandomizeButton>
                </Section>
            </SearchSection>
        )
    }
}

export default Comp;