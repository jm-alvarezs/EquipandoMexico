import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ajustes from './Ajustes';
import Diagnostico from './Diagnostico';
import Contenido from './Contenido';
import Agenda from './Agenda';
import Expertos from './Expertos';

const Tab = createBottomTabNavigator();

const color = '#276BA5';

const size = 25;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Expertos"
          component={Expertos}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Agenda"
          component={Agenda}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contenido"
          component={Contenido}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="play-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Diagnóstico"
          component={Diagnostico}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="clipboard" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={Ajustes}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
