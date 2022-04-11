import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import * as S from './styles';

const patternsContainersDirs = Object.freeze({
  context: './patterns/contextModuleFunctions',
  compoundComponents: './patterns/compoundComponents',
  compoundComponentsEnhanced: './patterns/compoundComponentsSupportingNesting',
  propsCollection: './patterns/propsCollection',
  propsGetters: './patterns/propsGetters',
  stateReducer: './patterns/stateReducer',
});

const ContextModuleFunctions = React.lazy(() =>
  import(patternsContainersDirs.context)
);
const CompoundComponents = React.lazy(() =>
  import(patternsContainersDirs.compoundComponents)
);

const CompoundComponentsEnhanced = React.lazy(() =>
  import(patternsContainersDirs.compoundComponentsEnhanced)
);

const PropsCollection = React.lazy(() =>
  import(patternsContainersDirs.propsCollection)
);

const PropsGetters = React.lazy(() =>
  import(patternsContainersDirs.propsGetters)
);

const StateReducer = React.lazy(() =>
  import(patternsContainersDirs.stateReducer)
);

function App() {
  return (
    <S.AppWrapper>
      <S.PatternsListWrapper>
        <h2>React Patterns</h2>
        <S.PatternsList>
          <S.StyledLink to="/contextModuleFunctions">
            Context Module Functions
          </S.StyledLink>
          <S.StyledLink to="/compaundComponents">
            Compaund Components
          </S.StyledLink>
          <S.StyledLink to="/compoundComponentsSupportingNesting">
            Compaund Components Supporting Nesting
          </S.StyledLink>
          <S.StyledLink to="/propsCollection">Props Collection</S.StyledLink>
          <S.StyledLink to="/propsGetters">Props Getters</S.StyledLink>
          <S.StyledLink to="/stateReducer">State Reducer</S.StyledLink>
        </S.PatternsList>
      </S.PatternsListWrapper>
      <S.PetternsView>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Initial page</div>} />
            <Route
              path="/contextModuleFunctions"
              element={<ContextModuleFunctions />}
            />
            <Route
              path="/compaundComponents"
              element={<CompoundComponents />}
            />
            <Route
              path="/compoundComponentsSupportingNesting"
              element={<CompoundComponentsEnhanced />}
            />
            <Route path="/propsCollection" element={<PropsCollection />} />
            <Route path="/propsGetters" element={<PropsGetters />} />
            <Route path="/stateReducer" element={<StateReducer />} />
          </Routes>
        </React.Suspense>
      </S.PetternsView>
    </S.AppWrapper>
  );
}

export default App;
