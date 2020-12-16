import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {PreguntasContext} from '../context/PreguntasContext';
import {colors, layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation, useRoute} from '@react-navigation/native';

const Pregunta = () => {
  const {
    pregunta,
    preguntas,
    getPregunta,
    getPreguntas,
    postPregunta,
    setRespuestaPregunta,
  } = useContext(PreguntasContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.idPregunta) {
      getPregunta(route.params.idPregunta);
    } else {
      const {idTipoPregunta} = route.params;
      getPreguntas(idTipoPregunta);
    }
  }, []);

  const renderPregunta = () => {
    if (pregunta && pregunta !== null) {
      return (
        <View>
          <Text style={[text.h2, layout.my, style.bold]}>
            Pregunta {pregunta.orden}
          </Text>
          <Text style={[text.h4, layout.my]}>{pregunta.texto}</Text>
          <Text style={[text.h4, layout.my]}>{pregunta.descripcion}</Text>
          <View style={[layout.row]}>
            <View style={[layout.half]}>
              <Button
                title="Sí"
                onPress={() => setRespuestaPregunta(pregunta.idPregunta, 'Si')}
                containerStyle={
                  pregunta.respuesta === 'Si'
                    ? [style.buttonPreguntaSelected]
                    : [style.mainButtonInner]
                }
                buttonStyle={[style.mainButtonInner]}
                titleStyle={{color: colors.dark}}
              />
            </View>
            <View style={[layout.half]}>
              <Button
                title="No"
                onPress={() => setRespuestaPregunta(pregunta.idPregunta, 'No')}
                containerStyle={
                  pregunta.respuesta === 'No'
                    ? [style.buttonPreguntaSelected]
                    : [style.mainButtonInner]
                }
                buttonStyle={[style.mainButtonInner]}
                titleStyle={{color: colors.dark}}
              />
            </View>
          </View>
        </View>
      );
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  const renderBoton = () => {
    return (
      <Button
        title="Siguiente"
        containerStyle={[style.mainButton]}
        buttonStyle={[style.mainButtonInner]}
        onPress={() => {
          postPregunta(pregunta);
          const index = preguntas.findIndex(
            (question) => question.idPregunta === pregunta.idPregunta,
          );
          if (pregunta.respuesta === 'Si') {
            navigation.navigate('PreguntaSi', {
              index,
            });
          } else {
            navigation.navigate('PreguntaCheckboxes', {
              idPregunta: pregunta.idPregunta,
            });
          }
        }}
      />
    );
  };

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding, {paddingTop: 0, height: 500}]}>
        <View style={[layout.row]}>{renderPregunta()}</View>
        <View style={[layout.row]}>
          <View style={[layout.half]}></View>
          <View style={[layout.half]}>{renderBoton()}</View>
        </View>
      </View>
    </Screen>
  );
};

export default Pregunta;
