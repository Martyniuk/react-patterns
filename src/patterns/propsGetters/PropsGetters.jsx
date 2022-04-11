import * as React from 'react';

import { Switch } from './components';

function callAll(...fns) {
  return (...args) => {
    fns.forEach((fn) => fn && fn(...args));
  };
}

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      // onClick: () => {
      //     onClick && onClick()
      //     toggle()
      // },
      ...props,
    };
  }

  return { on, getTogglerProps };
}

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

export { PropsGetters };
