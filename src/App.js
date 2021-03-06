/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {AnaliticasProvider} from './context/AnaliticasContext';
import {CitasProvider} from './context/CitasContext';
import {ContenidosProvider} from './context/ContenidosContext';
import {EspaciosProvider} from './context/EspaciosContext';
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
            <CitasProvider>
              <EspaciosProvider>
                <AnaliticasProvider>
                  <UserProvider>
                    <Home />
                  </UserProvider>
                </AnaliticasProvider>
              </EspaciosProvider>
            </CitasProvider>
          </PreguntasProvider>
        </ExpertosProvider>
      </ContenidosProvider>
    </UserProvider>
  );
};

export default App;
