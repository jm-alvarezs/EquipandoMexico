import React, {useContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {style, text, colors, layout, elements} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Code = () => {
  const [code, setCode] = useState('');

  const {confirmation, getUsuario, showSpinner, hideSpinner} = useContext(
    UserContext,
  );

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      showSpinner();
      await confirmation.confirm(code);
      hideSpinner();
      getUsuario();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Screen title="Equipando">
      <View style={[style.padding, {paddingVertical: 0}]}>
        <Text style={[text.h1, style.bold, layout.center]}>
          Ingresa el código
        </Text>
        <Text style={[layout.center]}>
          En breve, te llegará un SMS con un código.
        </Text>
      </View>
      <Card style={[style.shadow]}>
        <Text>Ingresar el Código</Text>
        <TextInput
          onChangeText={(code) => setCode(code)}
          value={code}
          style={[elements.input]}
          autoCapitalize="none"
        />
        <Button
          title="Entrar"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
        />
      </Card>
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text
          style={[style.mt, {color: colors.danger}]}
          onPress={() => navigation.navigate('Login')}>
          Cancelar
        </Text>
      </View>
    </Screen>
  );
};

export default Code;
