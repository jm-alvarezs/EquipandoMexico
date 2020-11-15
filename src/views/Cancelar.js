import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

const Cancelar = () => {
  const renderCita = () => {
    if (cita && cita !== null) {
      return (
        <View>
          <Text>{nombre}</Text>
          <Text>{moment(fecha_hora).format('DD MMM YYYY')}</Text>
          <Text>{moment(fecha_hora).format('HH:mm')}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Text>Precaución</Text>
      <Text>¿Deseas cancelar esta cita?</Text>
      {renderCita()}
      <Button title="Cancelar" />
    </View>
  );
};

export default Cancelar;
