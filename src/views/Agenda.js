import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';
import {ExpertosContext} from '../context/ExpertosContext';
import {style, text, colors} from '../styles';
import Screen from './Screen';
import moment from 'moment';
import {EspaciosContext} from '../context/EspaciosContext';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

const Agenda = () => {
  const {espacios, getEspaciosExperto} = useContext(EspaciosContext);

  const {experto, getExperto} = useContext(ExpertosContext);

  const {postCita} = useContext(CitasContext);

  const route = useRoute();

  useEffect(() => {
    const idExperto = route.params;
    getExperto(idExperto);
    getEspaciosExperto(idExperto);
  }, []);

  const renderExperto = () => {
    if (experto && experto !== null) {
      const {nombre, ubicacion, direccion} = experto;
      return (
        <View>
          <Text>{nombre}</Text>
          <Text>{ubicacion}</Text>
          <Text>{direccion}</Text>
        </View>
      );
    }
  };

  const renderEspacios = () => {
    if (espacios && espacios !== null) {
      return espacios.map((espacio) => (
        <Card onPress={() => postCita(espacio.idEspacio)}>
          <Text>De:</Text>
          <Text>
            {moment(espacio.fechaHoraInicio).format('DD MMM YYYY HH:mm')}
          </Text>
          <Text>a:</Text>
          <Text>
            {moment(espacio.fechaHoraInicio).format('DD MMM YYYY HH:mm')}
          </Text>
        </Card>
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Agenda">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Agenda</Text>
        {renderExperto()}
        {renderEspacios()}
        <View style={[style.my]}>
          <Text style={[text.h4, style.bold]}>Políticas de Reservación</Text>
          <Text>Hasta 15 minutos de tolerancia para respetar su cita</Text>
        </View>
      </View>
    </Screen>
  );
};

export default Agenda;
