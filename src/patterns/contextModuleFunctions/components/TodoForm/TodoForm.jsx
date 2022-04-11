import * as React from 'react'

import { addTodo, useTodoContext } from '../../context'
import { generateId } from '../../utils'

import { TextInput } from '../TextInput'
import { Button } from '../Button'
import * as S from './styles'


function TodoForm() {
    const [, dispatch] = useTodoContext()
    const [value, setValue] = React.useState('')

    function handleChange(e) {
        setValue(e.target.value)
    }

    function dispatchAddTodo() {
        const todo = {
            id: generateId(),
            desc: value,
            done: false
        }

        addTodo(dispatch, todo)
        setValue('')
    }

    function handleClick() {
        dispatchAddTodo()
    }

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            dispatchAddTodo()
        }
    }

    return (
        <S.Wrapper>
            <S.Label htmlFor="input">Wanna add a task for today?</S.Label>
            <S.InputWrapper>
                <TextInput id="input" value={value} onChange={handleChange} onKeyPress={handleKeyPress} />
                <Button onClick={handleClick} disabled={!value}>Create</Button>
            </S.InputWrapper>
        </S.Wrapper>

    )
}

export { TodoForm }