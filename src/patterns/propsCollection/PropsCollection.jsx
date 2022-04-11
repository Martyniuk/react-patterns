import * as React from 'react';

import { Switch } from './components';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const togglerProps = {
    'aria-pressed': on,
    onClick: toggle,
  };

  return { on, togglerProps };
}

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

export { PropsCollection };
