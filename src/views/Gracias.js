import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';

const Gracias = () => {
  const {cita} = useContext(CitasContext);

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
      <Text>¡Gracias!</Text>
      <Text>Cita Confirmada</Text>
      {renderCita()}
      <Text>¿Quieres agregarla al calendario?</Text>
      <Button title="Agregar a Calendario" />
    </View>
  );
};

export default Gracias;
