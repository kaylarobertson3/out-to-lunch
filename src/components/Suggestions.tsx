import React from 'react'
import styled from 'styled-components'

const SuggestionList = styled.li`

`

const SuggestionsWrapper = styled.ul`

`

const Suggestions = (props) => {
    const options = props.results.map(r => (
        <SuggestionList key={r.id}>
            {r.name}
        </SuggestionList>
    ))
    return <SuggestionsWrapper>{options}</SuggestionsWrapper>
}

export default Suggestions
