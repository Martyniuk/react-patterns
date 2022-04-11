import styled from 'styled-components'

const Button = styled.button`
    padding: 3px 10px;
    cursor: ${({ disabled }) => disabled ? 'not-allowed;' : 'pointer'};
    transition: all .2s ease;
    &:hover {
        color: #fff;
        background-color: rgb(60, 71, 75);
    }
    &:disabled {
        background-color: rgba(60, 71, 75, .4);
        color: rgba(60, 71, 75, .4)
    }
`

export { Button }