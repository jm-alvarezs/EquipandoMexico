import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Card, Button} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';
import {ExpertosContext} from '../context/ExpertosContext';
import {style, text} from '../styles';
import Screen from './Screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

const Agenda = () => {
  const [cita, setCita] = useState({
    fecha: new Date(),
  });

  const [show, setShow] = useState(false);

  const {experto} = useContext(ExpertosContext);

  const {postCita} = useContext(CitasContext);

  useEffect(() => {
    if (experto && !cita.idExperto) {
      setCita({...cita, idExperto});
    }
  }, [experto]);

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

  const {fecha, hora} = cita;

  return (
    <Screen title="Agenda">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Agenda</Text>
        {renderExperto()}
        <Card containerStyle={[style.mx0]}>
          <Text>Dia</Text>
          <TouchableOpacity onPress={() => setShow(!show)}>
            {moment(date).format('DD MMM YYYY')}
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={fecha}
              mode="date"
              onChange={(event, date) => setCita({...cita, fecha: date})}
            />
          )}
        </Card>
        <Card containerStyle={[style.mx0]}>
          <Text>Hora</Text>
          <DatePicker
            date={fecha}
            mode="time"
            onDateChange={(time) => setCita({...cita, hora: time})}
          />
        </Card>
        <View style={[style.my]}>
          <Text style={[text.h4, style.bold]}>Políticas de Reservación</Text>
          <Text>Hasta 15 minutos de tolerancia para respetar su cita</Text>
        </View>
        <Button
          title="Agendar"
          containerStyle={[style.mainButton, style.shadow]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => postCita(cita)}
        />
      </View>
    </Screen>
  );
};

export default Agenda;
