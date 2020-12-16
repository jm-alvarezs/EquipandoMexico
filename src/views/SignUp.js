import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {layout, style, text, colors, elements} from '../styles';
import Screen from './Screen';

const SignUp = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigation = useNavigation();

  const {signUp, signIn, created, spinner} = useContext(UserContext);

  const context = useContext(UserContext);

  const handleSubmit = () => {
    signUp(nombre, correo, password, telefono);
  };

  useEffect(() => {
    if (created) {
      signIn(context.correo, context.password);
    }
  }, [created]);

  return (
    <Screen title="Equipando">
      <View style={[style.padding]}>
        <Text style={[layout.center, text.h1, style.bold]}>Regístrate</Text>
      </View>
      <Card style={[style.shadow]}>
        <Text>Nombre</Text>
        <TextInput
          onChangeText={(nombre) => setNombre(nombre)}
          value={nombre}
          style={[elements.input]}
          textContentType="name"
        />
        <Text>Correo Electrónico</Text>
        <TextInput
          onChangeText={(correo) => setCorreo(correo)}
          value={correo}
          style={[elements.input]}
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <Text>Contraseña</Text>
        <TextInput
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
          style={[elements.input]}
          autoCapitalize="none"
          textContentType="password"
        />
        <Text>Número de Teléfono</Text>
        <TextInput
          onChangeText={(telefono) => setTelefono(telefono)}
          value={telefono}
          style={[elements.input]}
          textContentType="telephoneNumber"
        />
        <Button
          title={spinner ? 'Cargando...' : 'Registrarte'}
          containerStyle={[spinner ? style.mainButtonInner : style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
          disabled={spinner}
        />
      </Card>
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[style.mt]}>
          ¿Ya tienes una cuenta?{' '}
          <Text
            style={{color: colors.blue}}
            onPress={() => navigation.navigate('Login')}>
            Entrar ahora
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default SignUp;
