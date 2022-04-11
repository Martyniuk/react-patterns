# React patterns

Short summer up of an [Epic React](https://epicreact.dev/)(thx [Kent C Dodds](https://kentcdodds.com/)) course, my understanding and short description of every pattern

Some of examples are copied.

## 1. Context module functions pattern

Basic idea is keep your state as close to areas of usage as possible and share it with the help of Context (we dont know depth of our branch)

### Very plain schema of visual intro into approach

                         App
                          |
                        ThemeC
                      /   |   \
                usersC  adminC  productsC
                / |       |           |   \
          table  list    config      list  status

ThemeC - a toggler that defines whether Dark theme is on or off and it will impact all branches
usersC - is a branch where Context about is used
adminC - is a branch where Context about admin is used
productsC - is a branch where Context about products is used

each Context has its own state

--

### How it is implemented? Tech Details

Main idea is to use `Context` with `useReducer(in Provider)` that can handle more complex cases with state comparing to `useState`

In the same module where Context and Provider are created we write plain functions that will modify state

```
function updateUser(dispatch, updatedUser) {
  dispatch({ type: ACTIONS.USER_UPDATE, payload: updatedUser })
}
```

and in the end we will export all functionality we would like our users to use

```
export { UserContext, UserContextProvider, updateUser }
```

great advantage of this approach is that each Context module can be treeshaked, so Force of Optimisation is with us (link to Star Wars, hope you understood the joke 😁)

## 2. Compound Components pattern

very inhandy in development of re-usable components (library etc)

usage of

```
React.children.map(props.children, (child) => {
  return  React.cloneElement(child, { some props here });
})
```

in render in ParentComponent is basic concept of this approach.

Plain description:

You use ParentComponent to store state and you want child components to react on parents state changes - Select, Tabs, Accordion components using structure as below:

```HTML
<ParentComponent>
  <ChildComponent />
  <ChildComponent />
  <ChildComponent />

  <!-- you can have lots of Child components here -->
</ParentComponent>
```

## 3. Compound Components pattern (supporting nesting in components)

advanced approach of previous pattern, supports scenario when user(developer in our case) may nest Components and still expects some props to be received and used in Child component

instead of 👇

```
React.children.map(props.children, (child) => {
  return  React.cloneElement(child, { some props here });
})
```

parent component is implementing `Context` and is a `Provider` for all the children, but every Child should consume context

```HTML
<ParentComponent>
  <ChildComponent />
  <ChildComponent />

  <div>
    <div>
      <ChildComponent />
    </div>
  </div>

  <!-- you can have lots of Child components here -->
</ParentComponent>
```

## 4. Props collection pattern

One more pattern that is very cool to use in case of development of re-usable components libs.

This approach is about providing basic props via custom hook and this basic props should not be overwritten(but they can)

#### 👇

```JavaScript
function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const togglerProps = {
    'aria-pressed': on,
    onClick: toggle,
  };

  return { on, togglerProps };
}
```

Example of usage and potential issue

```JavaScript
function PropsCollection() {
  const { on, togglerProps } = useToggle();

  return (
    <div>
      <Switch
        on={on}
        {...togglerProps}
        // in case onClick will be here... default function will be overwritten and behaviour is unexpected
        // as solution check out next pattern - PropsGetters
      />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}
```

## 5. Props Getters

advanced approach of previous pattern, coz there is a chance to overwrite default behaviour of Components, as we seen [here](#👇)

Instead of providing basic props object from cusom hook - we provide a function

```JavaScript
function useToggle() {
    const [on, setOn] = React.useState(false)
    const toggle = () => setOn(!on)

    function getTogglerProps({onClick, ...props} = {}) {
        return {
            'aria-pressed': on,
            onClick: callAll(onClick, toggle),
            // onClick: () => {
            //     onClick && onClick()
            //     toggle()
            // },
            ...props,
        }
    }

    return {on, getTogglerProps}
}
```

Usage is:

```JavaScript
function PropsGetters() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}
```

as result we do consoling onClick and toggling as well 🥳

BTW
`callAll` function is famos interview question, so good to repeat 😁

```JavaScript


function callAll(...fns) {
  return (...args) => {
    fns.forEach((fn) => fn && fn(...args));
  };
}


```

## 6. State Reducer pattern

One more great candidate for custom components libraries & great example of Inversion of Control pattern

There are two heroes in our story:

1. 🎳 ----> library of components
2. 👾 ----> an App that would like to use this library

Each `Component` live by a Common `Redux` rules that are defined by its State, Reducer & Actions, as soon as action is dispatched 👉🏽 Reducer modifies a state 👉🏽 Component reacts on state change.

So we will export `Actions` and `Reducer` as well as our `Component`.

The key point of pattern is that we can rely on defined `Actions` and use `Custom reducer` for Custom behavoir and at the same time inside `Custom Reducer` we use `Component Reducer` for all default behaviour of a Component.

Please follow the code below, coz it comes to very talkative and frustrating description 😁

```JavaScript
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

```
