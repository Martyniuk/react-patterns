import * as React from 'react';

const ACTIONS = Object.freeze({
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
});

const initState = [];

function todoReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [...state, payload];
    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => todo.id !== payload);
    case ACTIONS.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, done: !payload.done };
        }
        return todo;
      });

    default:
      throw new Error(`Unsupported action type: ${type}`);
  }
}

const TodoContext = React.createContext();
TodoContext.displayName = 'TodoContext';

function useTodoContext() {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('TodoContext should be used within TodoContext.Provider');
  }

  return context;
}

function TodoContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(todoReducer, initState, () => {
    const todos = window.localStorage.getItem('todos');
    if (todos) {
      return JSON.parse(todos);
    }

    return initState;
  });

  React.useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);
  const value = [state, dispatch];

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function addTodo(dispatch, todo) {
  dispatch({ type: ACTIONS.ADD_TODO, payload: todo });
}

function deleteTodo(dispatch, todoId) {
  dispatch({ type: ACTIONS.DELETE_TODO, payload: todoId });
}

function toggleTodo(dispatch, todo) {
  dispatch({ type: ACTIONS.TOGGLE_TODO, payload: todo });
}

export { useTodoContext, TodoContextProvider, addTodo, deleteTodo, toggleTodo };
