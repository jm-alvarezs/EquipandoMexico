import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import {PreguntasContext} from '../context/PreguntasContext';
import {colors, layout, text} from '../styles';
import Screen from './Screen';
import {useRoute} from '@react-navigation/native';

const Pregunta = () => {
  const {pregunta, getPregunta, setRespuestaPregunta} = useContext(
    PreguntasContext,
  );

  const route = useRoute();

  useEffect(() => {
    const {idPregunta} = route.params;
    getPregunta(idPregunta);
  }, []);

  const renderPregunta = () => {
    if (pregunta && pregunta !== null) {
      return (
        <>
          <Text style={[text.h2, layout.my]}>Pregunta {pregunta.orden}</Text>
          <Text style={[text.h4, layout.my]}>{pregunta.texto}</Text>
          <Text style={[text.h4, layout.my]}>{pregunta.descripcion}</Text>
          <View style={[layout.row]}>
            <View style={[layout.half]}>
              <Button
                title="Sí"
                onPress={() =>
                  setRespuestaPregunta(route.params.idPregunta, 'Si')
                }
              />
            </View>
            <View style={[layout.half]}>
              <Button
                title="No"
                onPress={() =>
                  setRespuestaPregunta(route.params.idPregunta, 'No')
                }
              />
            </View>
          </View>
        </>
      );
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding]}>{renderPregunta()}</View>
    </Screen>
  );
};

export default Pregunta;
