/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ContenidosProvider} from './context/ContenidosContext';
import {ExpertosProvider} from './context/ExpertosContext';
import {PreguntasProvider} from './context/PreguntasContext';
import {UserProvider} from './context/UserContext';
import Home from './views/Home';

const App = () => {
  return (
    <UserProvider>
      <ContenidosProvider>
        <ExpertosProvider>
          <PreguntasProvider>
            <UserProvider>
              <Home />
            </UserProvider>
          </PreguntasProvider>
        </ExpertosProvider>
      </ContenidosProvider>
    </UserProvider>
  );
};

export default App;
