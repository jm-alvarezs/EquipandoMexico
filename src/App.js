/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {PreguntasProvider} from './context/PreguntasContext';
import Home from './views/Home';

const App = () => {
  return (
    <PreguntasProvider>
      <Home />
    </PreguntasProvider>
  );
};

export default App;
