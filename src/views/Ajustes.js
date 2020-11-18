import React, {useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import DatePicker from '../components/DatePicker';
import {UserContext} from '../context/UserContext';
import {style, text} from '../styles';
import Screen from './Screen';
import moment from 'moment';

const Ajustes = () => {
  const [editMode, setEditMode] = useState(false);
  const {user, setPropiedadUser, updateHijo} = useContext(UserContext);
  const [show, setShow] = useState(false);

  const renderUsuario = () => {
    if (user && user !== null) {
      let {nombre_hijo, fecha_nacimiento} = user;
      fecha_nacimiento = moment(fecha_nacimiento).format('YYYY-MM-DD');
      let fecha_object = {
        dia: fecha_nacimiento.substring(8),
        mes: fecha_nacimiento.substring(5, 7),
        year: fecha_nacimiento.substring(0, 4),
      };
      if (editMode) {
        return (
          <View style={{marginVertical: 24}}>
            <Text style={[style.bold]}>Nombre</Text>
            <TextInput
              value={nombre_hijo}
              onChangeText={(nombre_hijo) =>
                setPropiedadUser('nombre_hijo', nombre_hijo)
              }
            />
            <Text style={[style.bold]}>Fecha de Nacimiento</Text>
            <DatePicker
              fecha={fecha_object}
              modifier={(date) => {
                const fecha = `${date.year}-${date.mes}-${date.dia}`;
                setPropiedadUser('fecha_nacimiento', fecha);
              }}
            />
            <Button
              title="Guardar"
              containerStyle={[style.mainButton, style.shadow]}
              buttonStyle={[style.mainButtonInner]}
              onPress={() => {
                setEditMode(false);
                updateHijo({
                  idPadre: user.idUsuario,
                  nombre_hijo,
                  fecha_nacimiento,
                });
              }}
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
