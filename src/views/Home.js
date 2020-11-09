import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ajustes from './Ajustes';
import Diagnostico from './Diagnostico';
import Contenido from './Contenido';
import Agenda from './Agenda';
import Expertos from './Expertos';
import {colors} from '../styles';
import Pregunta from './Pregunta';

const Tab = createBottomTabNavigator();

const size = 25;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pregunta" component={Pregunta} />
        <Tab.Screen
          name="Expertos"
          component={Expertos}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="user" color={colors.dark} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Agenda"
          component={Agenda}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="calendar" color={colors.accent} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contenido"
          component={Contenido}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="play-circle" color={colors.accent} size={65} />
            ),
          }}
        />
        <Tab.Screen
          name="Diagnóstico"
          component={Diagnostico}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="clipboard" color={colors.dark} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={Ajustes}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="cog" color={colors.dark} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
