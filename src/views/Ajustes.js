import React, {useContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import {UserContext} from '../context/UserContext';
import {style, text} from '../styles';
import Screen from './Screen';
import moment from 'moment';

const Ajustes = () => {
  const [editMode, setEditMode] = useState(false);
  const {user, setPropiedadUser, updateHijo} = useContext(UserContext);

  const renderUsuario = () => {
    //if (user && user !== null) {
    const {nombre_hijo, fecha_nacimiento} = {
      fecha_nacimiento: new Date(),
      nombre_hijo: '',
    };
    if (editMode) {
      return (
        <View>
          <Text>Nombre</Text>
          <TextInput
            value={nombre_hijo}
            onChangeText={(nombre_hijo) =>
              setPropiedadUser('nombre_hijo', nombre_hijo)
            }
          />
          <Text>Fecha de Nacimiento</Text>
          <DatePicker
            date={fecha_nacimiento}
            mode="date"
            onDateChange={(date) => setPropiedadUser('fecha_nacimiento', date)}
          />
          <Button
            title="Guardar"
            containerStyle={[style.mainButton, style.shadow]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() =>
              updateHijo({
                idPadre: user.idUsuario,
                nombre_hijo,
                fecha_nacimiento,
              })
            }
          />
        </View>
      );
    }
    return (
      <View>
        <Text style={[text.h4]}>Nombre</Text>
        <Text style={[text.p]}>{nombre_hijo}</Text>
        <Text style={[text.h4]}>Fecha de Nacimiento</Text>
        <Text style={[text.p]}>
          {moment(fecha_nacimiento).format('DD MMM YYYY')}
        </Text>
        <Button
          title="Editar"
          containerStyle={[style.mainButton, style.shadow, style.mt]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => setEditMode(true)}
        />
      </View>
    );

    //}
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
