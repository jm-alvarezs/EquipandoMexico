import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, Image} from 'react-native-elements';
import {style} from '../styles';
import {BASE_URL} from '../utils';

const Contenido = () => {
  const route = useRoute();
  const idContenido = route.params.idContenido;

  useEffect(() => {
    getContenido(idContenido);
  }, []);

  const renderContenido = () => {
    if (contenido && contenido !== null) {
      const {nombre, descripcion, enlace, idAdjunto} = contenido;
      const src = `${BASE_URL}/adjuntos/${idAdjunto}`;
      return (
        <>
          <Image source={{uri: src}} />
          <Text>{nombre}</Text>
          <Text>{descripcion}</Text>
          {enlace !== null && (
            <Button
              title="Más Información"
              containerStyle={[style.mainButton, style.mt]}
              buttonStyle={[style.mainButtonInner]}
            />
          )}
        </>
      );
    }
  };

  return (
    <Screen title="Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>{renderContenido()}</View>
    </Screen>
  );
};
