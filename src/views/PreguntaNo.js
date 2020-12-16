import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {PreguntasContext} from '../context/PreguntasContext';
import {colors, layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation, useRoute} from '@react-navigation/native';

const PreguntaNo = () => {
  const {
    pregunta,
    preguntas,
    getPregunta,
    postPregunta,
    setPreguntaNo,
    setRespuestaPreguntaNo,
  } = useContext(PreguntasContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const index = route.params.index;
    setPreguntaNo(index);
  }, []);

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
                  setRespuestaPreguntaNo(pregunta.idPregunta, 'Si')
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
                  setRespuestaPreguntaNo(pregunta.idPregunta, 'No')
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

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding, {paddingTop: 0, height: '100%'}]}>
        {renderPregunta()}
        <View style={[layout.row, {marginTop: 24}]}>
          <View style={[layout.half]}></View>
          <View style={[layout.half]}>
            <Button
              title="Siguiente"
              containerStyle={[style.mainButton]}
              buttonStyle={[style.mainButtonInner]}
              onPress={() => {
                postPregunta(pregunta);
                const {index} = route.params;
                if (preguntas[index + 1]) {
                  const idPregunta = preguntas[index + 1].idPregunta;
                  getPregunta(idPregunta);
                  navigation.navigate('Pregunta', {
                    idPregunta,
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default PreguntaNo;
