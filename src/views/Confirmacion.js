import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';
import {EspaciosContext} from '../context/EspaciosContext';
import Screen from './Screen';
import moment from 'moment';
import {style, text} from '../styles';
import {ExpertosContext} from '../context/ExpertosContext';
import {useNavigation} from '@react-navigation/native';

const Confirmacion = () => {
  const {experto} = useContext(ExpertosContext);
  const {espacio} = useContext(EspaciosContext);
  const {spinner, created, postCita} = useContext(CitasContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (created) {
      navigation.navigate('Gracias');
    }
  }, [created]);

  return (
    <Screen title="Confirmar">
      <View style={[style.padding]}>
        <Text style={[text.h2, style.bold]}>Confirmación</Text>
        <Text style={[text.h3, style.my]}>
          ¿Estás seguro que deseas agendar?
        </Text>
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 2,
            ...style.mx0,
            ...style.mb,
          }}>
          <Text style={[text.h3, style.mb]}>{experto.nombre}</Text>
          <Text style={[text.h1, style.mb]}>
            {moment(espacio.fechaHoraInicio).format('DD MMM YYYY')}
          </Text>
          <Text style={[text.h2]}>
            {moment(espacio.fechaHoraInicio).format('hh:mm')} -{' '}
            {moment(espacio.fechaHora).format('hh:mm')}
          </Text>
        </Card>
        <Button
          title="Agendar"
          containerStyle={[
            spinner ? style.mainButtonInner : style.mainButton,
            style.shadow,
            style.mt,
          ]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => {
            postCita(espacio.idEspacio);
          }}
          disabled={spinner}
        />
        <View style={[style.my]}>
          <Text style={[text.h4, style.bold]}>Políticas de Reservación</Text>
          <Text>Hasta 15 minutos de tolerancia para respetar su cita</Text>
        </View>
      </View>
    </Screen>
  );
};

export default Confirmacion;
