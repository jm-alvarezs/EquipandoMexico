import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {UserContext} from '../context/UserContext';
import {style, text} from '../styles';
import Screen from './Screen';

const Diagnostico = () => {
  const {user} = useContext(UserContext);

  const renderDiagnostico = () => {
    if (user && user !== null) {
      const {diagnostico} = user;
      return (
        <View>
          <Text>Tu diagnóstico</Text>
          <Text>{diagnostico}</Text>
          <Text>¿Qué sigue?</Text>
          <Text>
            Te ayudaremos con contenido especial para tú y tu hijo(a) para que
            su desarrollo se incorpore de manera adecuada.
          </Text>
          <Button
            title="Agendar"
            containerStyle={[styles.secondaryButton, style.shadow]}
            buttonStyle={[styles.mainButtonInner]}
            onPress={() => {}}
          />
        </View>
      );
    }
  };

  return (
    <Screen title="Diagnóstico">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Diagnóstico</Text>
        {renderDiagnostico()}
      </View>
    </Screen>
  );
};

export default Diagnostico;
