import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px 500px;
    justify-content: center;
    gap: 50px;
    margin: 50px;
`
const PatternsListWrapper = styled.div`
    text-align: center;
`

const PatternsList = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledLink = styled(Link)`
    padding: 5px 15px;
    margin: 0 5px;
    color: #fff;
    background-color: rgb(79, 124, 172);
    border-radius: 10px;
    text-decoration: none;
    transition: background-color .2s ease;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);

    &:hover {
    background-color: rgb(60, 71, 75);
    }
`
const PetternsView = styled.div`
    text-align: center;
`

export {
    AppWrapper,
    PatternsListWrapper,
    PatternsList,
    StyledLink,
    PetternsView,
}