import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ajustes from './Ajustes';
import Diagnostico from './Diagnostico';
import Contenido from './Contenido';
import Contenidos from './Contenidos';
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
import Hijo from './Hijo';
import moment from 'moment';

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
        name="Contenidos"
        component={Contenidos}
        options={{headerShown: false}}
      />
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
  const {user, hijoCreated, userLoggedIn} = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
  }, []);

  const renderContenidos = () => {
    const {fecha_nacimiento} = user;
    const diff = moment().diff(fecha_nacimiento, 'months');
    if (diff > 53 && diff < 67) {
      return (
        <>
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
                <FontAwesome name="calendar" color={colors.dark} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Diagnostico"
            component={StackDiagnostico}
            options={{
              tabBarLabel: '',
              tabBarIcon: () => (
                <FontAwesome name="clipboard" color={colors.dark} size={size} />
              ),
            }}
          />
        </>
      );
    }
    return (
      <Tab.Screen
        name="Contenidos"
        component={StackContenidos}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <FontAwesome name="play" color={colors.dark} size={25} />
          ),
        }}
      />
    );
  };

  const renderRouter = () => {
    if (user !== null) {
      if (user.fecha_nacimiento === null && !hijoCreated) {
        return (
          <Tab.Navigator>
            <Tab.Screen
              name="Hijo"
              component={Hijo}
              options={{tabBarVisible: false}}
            />
          </Tab.Navigator>
        );
      }
      return (
        <Tab.Navigator initialRouteName="Diagnostico">
          {renderContenidos()}
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
      );
    }
    return (
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
    );
  };

  return <NavigationContainer>{renderRouter()}</NavigationContainer>;
};

export default App;
