import React from 'react';
import {View} from 'react-native';
import {Image, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {layout, style, text} from '../styles';
import {BASE_URL} from '../utils';
import {useNavigation} from '@react-navigation/native';

const ExpertoCard = ({experto}) => {
  const renderDireccion = (experto) => {
    return ['calle', 'numero', 'numero_int', 'colonia']
      .map((key) =>
        experto[key] && experto[key] !== null ? experto[key] : null,
      )
      .filter((elem) => elem !== null)
      .join(', ');
  };

  const navigation = useNavigation();

  const {idExperto, nombre, titulo, servicio, idAdjunto} = experto;
  return (
    <Card
      containerStyle={[
        style.mx0,
        {paddingVertical: 0, borderRadius: 10, borderWidth: 0},
      ]}>
      <View style={[layout.row]}>
        <View style={[layout.four]}>
          <Image source={{uri: `${BASE_URL}/adjuntos/${idAdjunto}`}} />
        </View>
        <View style={[layout.eight]}>
          <Card.Title style={[text.h3, {textAlign: 'left'}]}>
            {titulo} {nombre}
          </Card.Title>
          <Text style={[text.h4]}>{servicio}</Text>
          <Text style={[text.h5, style.bold, style.mt]}>Ubicación</Text>
          <Text style={[style.mb]}>{renderDireccion(experto)}</Text>
          <Button
            title="Agendar"
            containerStyle={[style.mainButton]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => {
              navigation.navigate('Agenda', {
                idExperto,
              });
            }}
          />
        </View>
      </View>
    </Card>
  );
};

export default ExpertoCard;
