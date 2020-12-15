import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import {PreguntasContext} from '../context/PreguntasContext';
import {text, colors} from '../styles';

const Cuestionario = () => {
  const {getTiposPregunta} = useContext(PreguntasContext);

  useEffect(() => {
    getTiposPregunta();
  }, []);

  const renderCuestionarios = () => {
    if (tipos && tipos !== null) {
      return tipos.map((tipoPregunta) => (
        <Card
          title={tipoPregunta.nombre}
          onPress={() => {
            navigation.navigate('Pregunta', {
              idTipoPregunta: tipoPregunta.idTipoPregunta,
            });
          }}
        />
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Cuestionario">
      <Text style={[text.h3]}>Selecciona un Cuestionario</Text>
      {renderCuestionarios()}
    </Screen>
  );
};

export default Cuestionario;
