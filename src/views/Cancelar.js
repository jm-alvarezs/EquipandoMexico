import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';

const Cancelar = () => {
  const {cita, deleteCita} = useContext(CitasContext);

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
      <Button title="Cancelar" onPress={() => deleteCita(cita)} />
    </View>
  );
};

export default Cancelar;
