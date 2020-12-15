import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {PreguntasContext} from '../context/PreguntasContext';
import {colors, layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const PreguntaCheckboxes = () => {
  const {
    pregunta,
    preguntas,
    preguntasNo,
    opciones,
    getCognicion,
    setPreguntaCognicion,
    setPropiedadCognicion,
  } = useContext(PreguntasContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const {index} = route.params;
    setPreguntaCognicion(index);
    getCognicion(preguntasNo[index].idPregunta);
  }, []);

  const renderPregunta = () => {
    if (pregunta && pregunta !== null) {
      return (
        <>
          <Text style={[text.h2, layout.my, style.bold]}>
            Pregunta {pregunta.orden}
          </Text>
          <Text style={[text.h4, layout.my]}>{pregunta.texto}</Text>
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
          const index = preguntas.findIndex(
            (question) => question.idPregunta === pregunta.idPregunta,
          );
          navigation.navigate('PreguntaNo', {
            index,
          });
        }}
      />
    );
  };

  const renderOpciones = () => {
    if (opciones && opciones !== null) {
      return opciones.map((opcion) => (
        <View style={[layout.row]}>
          <CheckBox
            disabled={false}
            value={opcion.checked}
            onValueChange={(check) =>
              setPropiedadCognicion(opcion.idPreguntaCognicion, check)
            }
          />
          <Text style={[text.p]}>{opcion.nombre}</Text>
        </View>
      ));
    }
  };

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding, {paddingTop: 0, height: 500}]}>
        {renderPregunta()}
        {renderOpciones()}
        <View style={[layout.row]}>
          <View style={[layout.half]}>
            {route.params.index > 1 && (
              <Button
                title="Anterior"
                containerStyle={[style.mainButtonInner]}
                buttonStyle={[style.mainButtonInner]}
                titleStyle={{color: colors.dark}}
                onPress={() =>
                  navigation.navigate('Pregunta', {
                    idPregunta: route.params.index - 1,
                  })
                }
              />
            )}
          </View>
          <View style={[layout.half]}>{renderBoton()}</View>
        </View>
      </View>
    </Screen>
  );
};

export default PreguntaCheckboxes;
