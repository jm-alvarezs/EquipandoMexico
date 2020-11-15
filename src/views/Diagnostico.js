import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Diagnostico = () => {
  const navigation = useNavigation();

  const {user} = useContext(UserContext);

  const renderDiagnostico = () => {
    if (user && user !== null) {
      const {diagnostico} = user;
      if (diagnostico && diagnostico !== null) {
        return (
          <View>
            <Text style={[text.h1, style.bold]}>Diagnóstico</Text>
            <Text>Tu diagnóstico</Text>
            <Text>{diagnostico}</Text>
            <Text>¿Qué sigue?</Text>
            <Text>
              Te ayudaremos con contenido especial para tú y tu hijo(a) para que
              su desarrollo se incorpore de manera adecuada.
            </Text>
            <Button
              title="Comenzar"
              containerStyle={[styles.secondaryButton, style.shadow]}
              buttonStyle={[styles.mainButtonInner]}
              onPress={() => navigation.navigate('Pregunta', {idPregunta: 1})}
            />
          </View>
        );
      }
    }
    return (
      <View style={[layout.center]}>
        <Text style={[text.h2, style.bold, style.my]}>¡Completa el Test!</Text>
        <Text style={[style.mb, layout.center, text.h4]}>
          Recibe un diagnóstico para que mejores el desarrollo de tu hijo(a)
        </Text>
        <Button
          title="Agendar"
          containerStyle={[style.mainButton, style.shadow]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => postCita(cita)}
        />
      </View>
    );
  };

  return (
    <Screen title="Diagnóstico">
      <View style={[style.padding, {paddingTop: 0}]}>
        {renderDiagnostico()}
      </View>
    </Screen>
  );
};

export default Diagnostico;
