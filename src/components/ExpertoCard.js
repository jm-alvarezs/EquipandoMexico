import React from 'react';
import {Image} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {BASE_URL} from '../utils';

const ExpertoCard = ({experto}) => {
  const {nombre, titulo, ubicacion, idAdjunto} = experto;
  return (
    <Card>
      <Image source={{uri: `${BASE_URL}/adjuntos/${idAdjunto}`}} />
      <Card.Title>{nombre}</Card.Title>
      <Text>{titulo}</Text>
      <Text>{ubicacion}</Text>
      <Button title="Agenda" />
    </Card>
  );
};

export default ExpertoCard;
