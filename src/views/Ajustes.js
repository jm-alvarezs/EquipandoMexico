import React, {useContext} from 'react';
import {View, Text, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {UserContext} from '../context/UserContext';
import {style, text} from '../styles';
import Screen from './Screen';

const Ajustes = () => {
  const {user, setPropiedadUser, updateUsuario} = useContext(UserContext);

  const renderUsuario = () => {
    if (user && user !== null) {
      const {nombre, fecha_nacimiento} = user;
      return (
        <View>
          <Text>Nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={(nombre) => setPropiedadUser('nombre', nombre)}
          />
          <Text>Fecha de Nacimiento</Text>
          <DatePicker
            date={fecha_nacimiento}
            mode="date"
            onDateChange={(date) => setPropiedadUser('fecha_nacimiento', date)}
          />
          <Button
            title="Agendar"
            containerStyle={[style.mainButton, style.shadow]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => updateUsuario(user)}
          />
        </View>
      );
    }
  };
  return (
    <Screen title="Ajustes">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Ajustes</Text>
        <Text>Notificaciones</Text>
        <Text style={[text.h2, style.bold, style.mt]}>Datos de tu hijo(a)</Text>
        {renderUsuario()}
      </View>
    </Screen>
  );
};

export default Ajustes;
