import * as React from 'react';

// importing Input component from library and reducer for it as well
import {
  TextInput,
  InputActionTypes,
  inputReducer,
  useInputState,
} from './components';

const tooManyChars = (chars) => chars.length >= 6;

function customInputReducer(state, action) {
  if (action.type === InputActionTypes.CHANGE && tooManyChars(state.value)) {
    return { value: state.value };
  }

  return inputReducer(state, action);
}

function StateReducer() {
  const { value, getChangeProps, getCleanProps } =
    useInputState(customInputReducer);
  const inputChangeProps = getChangeProps({
    value: value,
    disabled: tooManyChars(value),
    onChange: () => console.log('additional behaviour for onChange'),
  });

  return (
    <div>
      <TextInput {...inputChangeProps} />
      <button
        {...getCleanProps({
          onClick: () =>
            console.log('additional beh for Cleaning can be added'),
        })}
      >
        Clean
      </button>
    </div>
  );
}

export { StateReducer };
