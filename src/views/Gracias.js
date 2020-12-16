import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {CitasContext} from '../context/CitasContext';
import {style, text} from '../styles';
import Screen from './Screen';
import moment from 'moment';

const Gracias = () => {
  const {cita} = useContext(CitasContext);

  const renderCita = () => {
    if (cita && cita !== null) {
      const {nombre, fechaHoraInicio} = cita;
      return (
        <View>
          <Text>{nombre}</Text>
          <Text style={[text.h3]}>
            {moment(fechaHoraInicio).format('DD MMM YYYY')}
          </Text>
          <Text style={[text.h3, style.mt]}>
            {moment(fechaHoraInicio).format('HH:mm')}
          </Text>
        </View>
      );
    }
  };

  return (
    <Screen title="Equipando">
      <View style={[style.padding]}>
        <Text style={[text.h1, style.bold]}>¡Gracias!</Text>
        <Text style={[text.h2, style.mt]}>Cita Confirmada</Text>
        {renderCita()}
      </View>
    </Screen>
  );
};

export default Gracias;
