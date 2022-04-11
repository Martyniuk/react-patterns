import * as React from 'react';

const allowedTypes = [FirstComponent, SecondComponent];

function InnerComponent(props) {
  const [on, setOn] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const increment = () => setCounter(counter + 1);
  const toggle = () => setOn(!on);

  return React.Children.map(props.children, (child) => {
    // in case child will be 'plain' HTML tag - we will receive an error
    if (allowedTypes.includes(child.type)) {
      return React.cloneElement(child, { on, counter, toggle, increment });
    }

    return child;
  });
}

function FirstComponent(props) {
  return (
    <div style={{ border: '1px solid #000', margin: '15px', padding: '10px' }}>
      <h4>First Component</h4>
      <p>{props.on ? 'it is on' : 'it is off'}</p>
      <button onClick={() => props.increment('Other location')}>
        Increment
      </button>
    </div>
  );
}
function SecondComponent(props) {
  return (
    <div style={{ border: '1px solid #000', margin: '15px', padding: '10px' }}>
      <h4>Second Component</h4>
      <p>Counter: {props.counter}</p>
      <button onClick={() => props.toggle()}>Toggle on/off</button>
    </div>
  );
}

function CompoundComponents() {
  return (
    <div>
      <InnerComponent>
        <FirstComponent />
        <SecondComponent />
        <div>not allowed component</div>
        {/* any amount of components can be here, but they can not be Nested */}
      </InnerComponent>
    </div>
  );
}

export { CompoundComponents };
