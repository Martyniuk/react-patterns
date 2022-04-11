import * as React from 'react';
import styled from 'styled-components';

const FirstLevel = styled.div`
  border: 2px solid red;
  width: 300px;
  height: 300px;
`;

const SecondLevel = styled.div`
  border: 2px solid green;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const CounterContext = React.createContext();
CounterContext.displayName = 'CounterContext';

function useCounterContextState() {
  const context = React.useContext(CounterContext);
  if (!context) {
    throw new Error(
      `useCounterContextState should be called within CounterContext.Provider`
    );
  }

  return context;
}

function InnerComponent({ children }) {
  const [counter, setCounter] = React.useState(0);
  const increment = () => setCounter(counter + 1);
  const value = [counter, increment];

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

function IncrementComponent() {
  const [, increment] = useCounterContextState();

  return (
    <div style={{ margin: '20px' }}>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

function CountComponent() {
  const [counter] = useCounterContextState();

  return <div>{counter}</div>;
}

function CompoundComponentsSupportingNesting() {
  return (
    <div style={{ display: 'flex' }}>
      <InnerComponent>
        <IncrementComponent />
        <div>
          <div>
            <FirstLevel>
              <p>First Level</p>
              <SecondLevel>
                <p>Second Level</p>
                <CountComponent />
              </SecondLevel>
            </FirstLevel>
          </div>
        </div>
      </InnerComponent>
    </div>
  );
}

export { CompoundComponentsSupportingNesting };
