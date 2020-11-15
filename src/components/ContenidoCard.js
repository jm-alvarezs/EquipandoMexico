import React from 'react';
import {Card} from 'react-native-elements';
import {BASE_URL} from '../utils';

const ContenidoCard = ({contenido}) => {
  const {titulo, idAdjunto} = contenido;
  return (
    <Card>
      <Card.Title>{titulo}</Card.Title>
      <Card.Image
        source={{uri: `${BASE_URL}/adjuntos/${idAdjunto}`}}></Card.Image>
    </Card>
  );
};

export default ContenidoCard;
