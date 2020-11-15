import React, {useContext} from 'react';
import {View, Text, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {UserContext} from '../context/UserContext';

const Ajustes = () => {
  const {user} = useContext(UserContext);

  const {nombre, fecha_nacimiento} = user;

  return (
    <View>
      <Text>Ajustes</Text>
      <Text>Notificaciones</Text>
      <Text>Datos de tu hijo(a)</Text>
      <Text>Nombre</Text>
      <TextInput value={nombre} />
      <Text>Fecha de Nacimiento</Text>
      <DatePicker date={fecha_nacimiento} mode="date" />
    </View>
  );
};

export default Ajustes;
