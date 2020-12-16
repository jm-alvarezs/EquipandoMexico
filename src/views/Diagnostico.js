import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';
import {PreguntasContext} from '../context/PreguntasContext';

const Diagnostico = () => {
  const navigation = useNavigation();

  const {resultados, idDiagnostico, getDiagnostico} = useContext(
    PreguntasContext,
  );

  useEffect(() => {
    getDiagnostico(idDiagnostico);
  }, []);

  const renderDiagnosticos = () => {
    return resultados.map((resultado) => (
      <View style={[layout.row]}>
        <View style={[layout.half]}>
          <Text style={[text.h2]}>{resultado.nombre}</Text>
        </View>
        <View style={[layout.half]}>
          <Text style={[text.h2]}>{resultado.porcentaje}</Text>
        </View>
      </View>
    ));
  };

  const renderResultado = () => {
    if (resultados && resultados !== null) {
      return (
        <View>
          <Text style={[text.h1, style.bold]}>Resultado</Text>
          {renderDiagnosticos()}
          <Text style={[text.h4, style.bold, style.mt]}>¿Qué sigue?</Text>
          <Text>
            Puedes asesorarte con un experto en los indicadores que más necesita
            apoyo tu hijo(a).
          </Text>
          <Button
            title="Ir a Expertos"
            containerStyle={[style.mainButton, style.mt]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => navigation.navigate('Expertos')}
          />
        </View>
      );
    }
  };

  return (
    <Screen title="Diagnóstico">
      <View style={[style.padding, {paddingTop: 0, height: 800}]}>
        {renderResultado()}
      </View>
    </Screen>
  );
};

export default Diagnostico;
