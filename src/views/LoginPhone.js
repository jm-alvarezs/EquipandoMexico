import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {style, text, colors, layout} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [telefono, setTelefono] = useState('');

  const {signInPhone, confirmation} = useContext(UserContext);

  const navigation = useNavigation();

  const handleSubmit = () => {
    signInPhone(telefono);
  };

  useEffect(() => {
    if (confirmation) {
      navigation.navigate('Code');
    }
  }, [confirmation]);

  return (
    <Screen title="Equipando">
      <View style={[style.padding, {paddingVertical: 0}]}>
        <Text style={[text.h1, style.bold, layout.center]}>Entrar</Text>
      </View>
      <Card style={[style.shadow]}>
        <Text>Número de Teléfono</Text>
        <TextInput
          onChangeText={(telefono) => setTelefono(telefono)}
          value={telefono}
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

export default SignUp;
