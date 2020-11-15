import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';

const Agenda = () => {
  const [cita, setCita] = useState({});

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

  return (
    <View>
      <Text>Agenda</Text>
      {renderExperto()}
      <Card>
        Dia{' '}
        <DatePicker
          mode="date"
          onDateChange={(date) => setCita({...cita, fecha: date})}
        />
      </Card>
      <Card>
        Hora{' '}
        <DatePicker
          mode="time"
          onDateChange={(time) => setCita({...cita, hora: time})}
        />
      </Card>
      <Text>Políticas de Reservación</Text>
      <Text>Hasta 15 minutos de tolerancia para respetar su cita</Text>
      <Button title="Agendar" onPress={() => postCita(cita)} />
    </View>
  );
};

export default Agenda;
