import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {CitasContext} from '../context/CitasContext';
import {style} from '../styles';
import Screen from './Screen';

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
    <Screen title="Equipando">
      <View style={[style.padding]}>
        <Text>¡Gracias!</Text>
        <Text>Cita Confirmada</Text>
        {renderCita()}
      </View>
    </Screen>
  );
};

export default Gracias;
