import * as React from 'react'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))
const InputActionTypes = Object.freeze({
    CHANGE: 'CHANGE',
    CLEAN: 'CLEAN',
})

function inputReducer(state, action) {
    switch (action.type) {
      case InputActionTypes.CHANGE: {
        return { ...state, value: action.payload }
      }
      case InputActionTypes.CLEAN: {
        return action.payload
      }

      default:
        throw new Errr(`Unsupported action type: ${action.type}`)
    }
}

function useInputState(reducer = inputReducer, initState = { value: '' } ) {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { value } = state

  const change = (event) => dispatch({ type: InputActionTypes.CHANGE, payload: event.target.value })
  const clean = () => dispatch({ type: InputActionTypes.CLEAN, payload: initState })

  function getChangeProps({onChange, ...props} = {}) {
    return {
      onChange: callAll(onChange, change),
      ...props,
    }
  }

  function getCleanProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, clean),
      ...props,
    }
  }

  return {
    value,
    change,
    clean,
    getChangeProps,
    getCleanProps
  }
}

function TextInput(props) {
    return <input type="text" value={props.value} {...props} />
}

export { TextInput, InputActionTypes, inputReducer, useInputState };