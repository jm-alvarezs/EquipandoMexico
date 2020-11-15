import React, {useContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {style, text, colors, layout} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Code = () => {
  const [code, setCode] = useState('');

  const {confirmation, getUsuario} = useContext(UserContext);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await confirmation.confirm(code);
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
        <Text>En breve, te llegará un SMS con un código.</Text>
      </View>
      <Card style={[style.shadow]}>
        <Text>Ingresar el Código</Text>
        <TextInput onChangeText={(code) => setCode(code)} value={code} />
        <Button
          title="Entrar"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
        />
      </Card>
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text
          style={{color: colors.danger}}
          onPress={() => navigation.navigate('Login')}>
          Cancelar
        </Text>
      </View>
    </Screen>
  );
};

export default Code;
