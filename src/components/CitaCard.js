import moment from 'moment';
import React from 'react';
import {Button, Card} from 'react-native-elements';

const CitaCard = ({cita}) => {
  const {nombre, ubicacion, fecha_hora} = cita;

  return (
    <Card>
      <Card.Title>{nombre}</Card.Title>
      <Text>{ubicacion}</Text>
      <Text>Día {moment(fecha_hora).format('DD MMM YYYY')}</Text>
      <Text>Hora {moment(fecha_hora).format('HH:mm')}</Text>
      <Button
        title="Cancelar"
        onPress={() => navigation.navigate('Cancelar', {idCita: cita.idCita})}
      />
    </Card>
  );
};

export default CitaCard;
