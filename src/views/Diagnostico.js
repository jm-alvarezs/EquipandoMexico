import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';
import {PreguntasContext} from '../context/PreguntasContext';

const Diagnostico = () => {
  const navigation = useNavigation();

  const {diagnostico, idDiagnostico, getDiagnostico} = useContext(
    PreguntasContext,
  );

  useEffect(() => {
    getDiagnostico(idDiagnostico);
  }, []);

  const renderDiagnostico = () => {
    if (diagnostico && diagnostico !== null) {
      return (
        <View>
          <Text style={[text.h1, style.bold]}>Diagnóstico</Text>
          <Text style={[text.h4, style.mt]}>Tu diagnóstico:</Text>
          <Text style={[text.h2]}>{diagnostico.nombre}</Text>
          <Text style={[text.h4, style.bold, style.mt]}>¿Qué sigue?</Text>
          <Text>
            Te ayudaremos con contenido especial para tú y tu hijo(a) para que
            su desarrollo se incorpore de manera adecuada.
          </Text>
          <Button
            title="Ver Contenido"
            containerStyle={[style.mainButton, style.mt]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => navigation.navigate('Contenido')}
          />
        </View>
      );
    }
    /*return (
      <View style={[layout.center]}>
        <Text style={[text.h2, style.bold, style.my]}>¡Completa el Test!</Text>
        <Text style={[style.mb, layout.center, text.h4]}>
          Recibe un diagnóstico para que mejores el desarrollo de tu hijo(a)
        </Text>
        <Button
          title="Comenzar"
          containerStyle={[style.mainButton, style.shadow]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => navigation.navigate('Cuestionario')}
        />
      </View>
    );*/
  };

  return (
    <Screen title="Diagnóstico">
      <View style={[style.padding, {paddingTop: 0, height: 800}]}>
        {renderDiagnostico()}
      </View>
    </Screen>
  );
};

export default Diagnostico;
