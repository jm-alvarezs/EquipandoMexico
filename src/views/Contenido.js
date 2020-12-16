import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {ContenidosContext} from '../context/ContenidosContext';
import {style, text} from '../styles';
import {BASE_URL} from '../utils';
import Screen from './Screen';
import Video from 'react-native-video';

const Contenido = () => {
  const route = useRoute();
  const idContenido = route.params.idContenido;

  const {contenido, getContenido} = useContext(ContenidosContext);

  useEffect(() => {
    getContenido(idContenido);
  }, []);

  const renderContenido = () => {
    if (contenido && contenido !== null) {
      const {nombre, descripcion, enlace} = contenido;
      return (
        <View style={[{width: '100%'}]}>
          <View style={[{width: '100%'}]}>{renderAdjunto()}</View>
          <Text style={[text.h1, style.mb, style.bold]}>{nombre}</Text>
          <Text>{descripcion}</Text>
          {enlace !== null && enlace !== '' && (
            <Button
              title="Más Información"
              containerStyle={[style.mainButton, style.mt]}
              buttonStyle={[style.mainButtonInner]}
              onPress={() => {
                Linking.canOpenURL(enlace).then((supported) => {
                  if (supported) {
                    Linking.openURL(enlace);
                  } else {
                    console.log("Don't know how to open URI: " + enlace);
                  }
                });
              }}
            />
          )}
        </View>
      );
    }
  };

  const renderAdjunto = () => {
    const src = `${BASE_URL}/adjuntos/${contenido.idAdjunto}`;
    if (['mp4', 'mov'].includes(contenido.tipoAdjunto)) {
      const videoURL = `${src}.mp4`;
      return (
        <Video
          source={{uri: videoURL}}
          style={{flex: 1, width: '100%', height: 400}}
          controls
          paused
        />
      );
    }
    return (
      <Image
        source={{uri: src}}
        containerStyle={{width: '100%', height: 200}}
      />
    );
  };

  return (
    <Screen title="Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>{renderContenido()}</View>
    </Screen>
  );
};

export default Contenido;
