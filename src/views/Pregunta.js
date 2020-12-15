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
    getPreguntas,
    getPregunta,
    postPreguntas,
    popPregunta,
    pushPregunta,
    setRespuestaPregunta,
  } = useContext(PreguntasContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (!preguntas || preguntas === null) {
      const {idTipoPregunta} = route.params;
      getPreguntas(idTipoPregunta);
    }
  }, []);

  useEffect(() => {
    if (preguntas !== null && pregunta === null) {
      const {idPregunta} = route.params;
      getPregunta(idPregunta);
    }
  }, [preguntas]);

  const renderPregunta = () => {
    if (pregunta && pregunta !== null) {
      return (
        <>
          <Text style={[text.h2, layout.my, style.bold]}>
            Pregunta {pregunta.orden}
          </Text>
          <Text style={[text.h4, layout.my]}>{pregunta.texto}</Text>
          <Text style={[text.h4, layout.my]}>{pregunta.descripcion}</Text>
          <View style={[layout.row]}>
            <View style={[layout.half]}>
              <Button
                title="Sí"
                onPress={() =>
                  setRespuestaPregunta(route.params.idPregunta, 'Si')
                }
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
                onPress={() =>
                  setRespuestaPregunta(route.params.idPregunta, 'No')
                }
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
        </>
      );
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  const renderBoton = () => {
    if (preguntas && preguntas !== null) {
      if (preguntas.length === route.params.idPregunta) {
        return (
          <Button
            title="Terminar"
            onPress={() => postPreguntas(preguntas)}
            containerStyle={[style.mainButton]}
            buttonStyle={[style.mainButtonInner]}
          />
        );
      }
    }
    return (
      <Button
        title="Siguiente"
        containerStyle={[style.mainButton]}
        buttonStyle={[style.mainButtonInner]}
        onPress={() => {
          pushPregunta(pregunta);
          if (pregunta.respuesta === 'Si') {
            const index = preguntas.findIndex(
              (question) => question.idPregunta === pregunta.idPregunta,
            );
            navigation.navigate('PreguntaSi', {
              index,
            });
          } else {
            navigation.navigate('PreguntaCheckboxes', {
              idPregunta: route.params.idPregunta + 1,
            });
          }
        }}
      />
    );
  };

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding, {paddingTop: 0, height: '100%'}]}>
        {renderPregunta()}
        <View style={[layout.row, {position: 'absolute', bottom: 150}]}>
          <View style={[layout.half]}>
            {route.params.idPregunta > 1 && (
              <Button
                title="Anterior"
                containerStyle={[style.mainButtonInner]}
                buttonStyle={[style.mainButtonInner]}
                titleStyle={{color: colors.dark}}
                onPress={() => {
                  popPregunta();
                  navigation.navigate('Pregunta', {
                    idPregunta: route.params.idPregunta - 1,
                  });
                }}
              />
            )}
          </View>
          <View style={[layout.half]}>{renderBoton()}</View>
        </View>
      </View>
    </Screen>
  );
};

export default Pregunta;
