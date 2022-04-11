import styled from 'styled-components'

const Input = styled.input`
    background-color: rgb(60, 71, 75);
    border-radius: 5px;
    padding: 2px 20px;
    margin: 0 20px;
    width: 60%;
    color: #fff;
    outline: rgb(60,71,75);
    text-decoration: ${({done}) => done ? 'line-through' : 'none'};
`

function TextInput(props) {
    return <Input type="text" {...props} />
}

export { TextInput }