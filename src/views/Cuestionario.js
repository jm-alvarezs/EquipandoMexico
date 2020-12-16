import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PreguntasContext} from '../context/PreguntasContext';
import {text, colors, style} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Cuestionario = () => {
  const {tipos, getTiposPregunta, postDiagnostico} = useContext(
    PreguntasContext,
  );

  const navigation = useNavigation();

  useEffect(() => {
    getTiposPregunta();
  }, []);

  const renderCuestionarios = () => {
    if (tipos && tipos !== null) {
      return tipos.map((tipoPregunta) => (
        <TouchableOpacity
          key={tipoPregunta.idTipoPregunta}
          onPress={() => {
            postDiagnostico(tipoPregunta.idTipoPregunta);
            navigation.navigate('Pregunta', {
              idTipoPregunta: tipoPregunta.idTipoPregunta,
            });
          }}>
          <Card containerStyle={{borderRadius: 10, borderWidth: 0}}>
            <Text style={[text.h4]}>{tipoPregunta.nombre}</Text>
          </Card>
        </TouchableOpacity>
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Cuestionario">
      <Text style={[text.h3, style.padding, style.bold, {paddingVertical: 0}]}>
        Selecciona un Cuestionario
      </Text>
      {renderCuestionarios()}
    </Screen>
  );
};

export default Cuestionario;
