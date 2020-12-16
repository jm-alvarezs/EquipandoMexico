import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {PreguntasContext} from '../context/PreguntasContext';
import {layout, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const PreguntaCheckboxes = () => {
  const {
    pregunta,
    idDiagnostico,
    idRespuesta,
    preguntas,
    opciones,
    getCognicion,
    postCognicion,
    setPropiedadCognicion,
  } = useContext(PreguntasContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const {idPregunta} = route.params;
    getCognicion(idPregunta);
  }, []);

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
          <Text style={[text.p]}>
            {opcion.nombre}: {opcion.descripcion}
          </Text>
        </View>
      ));
    }
  };

  const isDisabled = () => {
    let disabled = true;
    if (opciones && opciones !== null) {
      opciones.forEach((opcion) => {
        if (opcion.checked) disabled = false;
      });
    }
    return disabled;
  };

  return (
    <Screen title="Pregunta">
      <View style={[layout.padding, {paddingTop: 0, height: 500}]}>
        <Text style={[text.h4, layout.my]}>¿Por qué no puede lograrlo?</Text>
        {renderOpciones()}
        <View style={[layout.row]}>
          <View style={[layout.half]}></View>
          <View style={[layout.half]}>
            <Button
              title="Siguiente"
              containerStyle={[
                isDisabled() ? style.mainButtonInner : style.mainButton,
              ]}
              buttonStyle={[style.mainButtonInner]}
              onPress={() => {
                postCognicion(idDiagnostico, idRespuesta, opciones);
                const index = preguntas.findIndex(
                  (question) => question.idPregunta === pregunta.idPregunta,
                );
                navigation.navigate('PreguntaNo', {
                  index,
                });
              }}
              disabled={isDisabled()}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default PreguntaCheckboxes;
