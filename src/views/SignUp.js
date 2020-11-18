import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {layout, style, text, colors} from '../styles';
import Screen from './Screen';

const SignUp = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigation = useNavigation();

  const {signUp, created} = useContext(UserContext);

  const handleSubmit = () => {
    signUp(nombre, correo, password, telefono);
  };

  useEffect(() => {
    if (created) {
      navigation.navigate('Login');
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
        />
        <Text>Correo Electrónico</Text>
        <TextInput
          onChangeText={(correo) => setCorreo(correo)}
          value={correo}
        />
        <Text>Contraseña</Text>
        <TextInput
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
        />
        <Text>Número de Teléfono</Text>
        <TextInput
          onChangeText={(telefono) => setTelefono(telefono)}
          value={telefono}
        />
        <Button
          title="Registrarte"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
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
