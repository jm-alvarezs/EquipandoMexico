import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {style, text} from '../styles';
import {BASE_URL} from '../utils';

const ContenidoCard = ({contenido}) => {
  const navigation = useNavigation();
  const {idContenido, nombre, descripcion, idAdjunto} = contenido;
  const src = `${BASE_URL}/adjuntos/${idAdjunto}`;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Contenido', {idContenido})}
      style={{marginBottom: 24}}>
      <Card
        containerStyle={{
          margin: -8,
          padding: 0,
          borderRadius: 20,
        }}>
        <Card.Image source={{uri: src}} />
        <View style={[{paddingHorizontal: 24, paddingVertical: 12}]}>
          <Text style={[text.h3, style.bold]}>{nombre}</Text>
          <Text style={[text.p]}>
            {String(descripcion).substring(0, 140).concat('...')}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ContenidoCard;
