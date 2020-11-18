import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ajustes from './Ajustes';
import Diagnostico from './Diagnostico';
import Contenido from './Contenido';
import Agenda from './Agenda';
import Expertos from './Expertos';
import {colors} from '../styles';
import {UserContext} from '../context/UserContext';
import SignUp from './SignUp';
import Login from './Login';
import Code from './Code';
import AgregarExperto from './AgregarExperto';
import AgregarContenido from './AgregarContenido';
import Pregunta from './Pregunta';
import Cancelar from './Cancelar';
import Gracias from './Gracias';
import Citas from './Citas';

const Tab = createBottomTabNavigator();

const AuthTab = createBottomTabNavigator();

const size = 25;

const StackAgenda = () => {
  const AgendaNavigator = createStackNavigator();
  return (
    <AgendaNavigator.Navigator>
      <AgendaNavigator.Screen
        name="Citas"
        component={Citas}
        options={{headerShown: false}}
      />
      <AgendaNavigator.Screen
        name="Cancelar"
        component={Cancelar}
        options={{headerShown: false}}
      />
    </AgendaNavigator.Navigator>
  );
};

const StackDiagnostico = () => {
  const DiagnosticoNavigator = createStackNavigator();
  return (
    <DiagnosticoNavigator.Navigator>
      <DiagnosticoNavigator.Screen
        name="Diagnostico"
        component={Diagnostico}
        options={{headerShown: false}}
      />
      <DiagnosticoNavigator.Screen
        name="Pregunta"
        component={Pregunta}
        options={{headerShown: false}}
      />
    </DiagnosticoNavigator.Navigator>
  );
};

const StackContenidos = () => {
  const ContenidosNavigator = createStackNavigator();
  return (
    <ContenidosNavigator.Navigator>
      <ContenidosNavigator.Screen
        name="Contenido"
        component={Contenido}
        options={{headerShown: false}}
      />
      <ContenidosNavigator.Screen
        name="AgregarContenido"
        component={AgregarContenido}
        options={{headerShown: false}}
      />
    </ContenidosNavigator.Navigator>
  );
};

const StackExpertos = () => {
  const ExpertosNavigator = createStackNavigator();
  return (
    <ExpertosNavigator.Navigator>
      <ExpertosNavigator.Screen
        name="Expertos"
        component={Expertos}
        options={{headerShown: false}}
      />
      <ExpertosNavigator.Screen
        name="AgregarExperto"
        component={AgregarExperto}
        options={{headerShown: false}}
      />
      <ExpertosNavigator.Screen
        name="Agenda"
        component={Agenda}
        options={{headerShown: false}}
      />
      <ExpertosNavigator.Screen
        name="Gracias"
        component={Gracias}
        options={{headerShown: false}}
      />
    </ExpertosNavigator.Navigator>
  );
};

const App = () => {
  const {user, userLoggedIn} = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
  }, []);

  //if (user !== null) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Expertos"
          component={StackExpertos}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="user" color={colors.dark} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Citas"
          component={StackAgenda}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="calendar" color={colors.accent} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contenidos"
          component={StackContenidos}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <FontAwesome name="play-circle" color={colors.accent} size={65} />
            ),
          }}
        />
        <Tab.Screen
          name="Diagnóstico"
          component={StackDiagnostico}
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
  //}
  return (
    <NavigationContainer>
      <AuthTab.Navigator>
        <AuthTab.Screen
          name="SignUp"
          component={SignUp}
          options={{tabBarVisible: false}}
        />
        <AuthTab.Screen
          name="Login"
          component={Login}
          options={{tabBarVisible: false}}
        />
        <AuthTab.Screen
          name="Code"
          component={Code}
          options={{tabBarVisible: false}}
        />
      </AuthTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
