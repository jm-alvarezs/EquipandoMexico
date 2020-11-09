import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import {PreguntasContext} from '../context/PreguntasContext';
import {colors, elements, layout, text} from '../styles';

const Pregunta = () => {
  const {pregunta, getPregunta, getPreguntas} = useContext(PreguntasContext);

  const numero = 1;

  useEffect(() => {
    getPreguntas();
    setTimeout(() => {
      getPregunta(numero);
    }, 2000);
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
              <Button title="Sí" />
            </View>
            <View style={[layout.half]}>
              <Button title="No" />
            </View>
          </View>
        </>
      );
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return <View style={[layout.padding]}>{renderPregunta()}</View>;
};

export default Pregunta;
