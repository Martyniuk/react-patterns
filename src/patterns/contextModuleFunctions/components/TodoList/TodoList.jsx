import * as React from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { useTodoContext, toggleTodo, deleteTodo } from '../../context';

const Wrapper = styled.div`
  margin: 5px 0;
`;

const Description = styled.p`
  display: inline-block;
  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  cursor: pointer;
  width: 70%;
  background-color: rgb(60, 71, 75);
  color: #fff;
  padding: 5px 0;
  margin: 0 5px;
  border-radius: 5px;
  box-shadow: 0 10px 20px -8px rgb(0 0 0 / 70%);
`;

function TodoList() {
  const [todos, dispatch] = useTodoContext();

  return (
    <div>
      {todos.map((todo) => {
        return (
          <Wrapper key={todo.id}>
            <Description
              done={todo.done}
              onClick={() => toggleTodo(dispatch, todo)}
            >
              {todo.desc}
            </Description>
            <Button onClick={() => deleteTodo(dispatch, todo.id)}>
              Delete
            </Button>
          </Wrapper>
        );
      })}
    </div>
  );
}

export { TodoList };
