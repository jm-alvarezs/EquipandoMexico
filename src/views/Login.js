import React, {useContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {style, text, colors, layout, elements} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(UserContext);

  const navigation = useNavigation();

  const handleSubmit = () => {
    signIn(email, password);
  };

  return (
    <Screen title="OPTI">
      <View style={[style.padding, {paddingVertical: 0}]}>
        <Text style={[text.h1, style.bold, layout.center]}>Entrar</Text>
      </View>
      <Card style={[style.shadow]}>
        <Text style={[text.p, style.bold]}>Correo Electrónico</Text>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          value={email}
          autoCapitalize="none"
          style={[elements.input]}
          textContentType="emailAddress"
        />
        <Text style={[text.p, style.bold]}>Contraseña</Text>
        <TextInput
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          style={[elements.input]}
          textContentType="password"
        />
        <Button
          title="Entrar"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
        />
      </Card>
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[style.mt]}>
          ¿Aún no tienes una cuenta?{' '}
          <Text
            style={{color: colors.blue}}
            onPress={() => navigation.navigate('SignUp')}>
            Regístrate
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default Login;
