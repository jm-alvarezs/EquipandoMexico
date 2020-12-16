import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import DatePicker from '../components/DatePicker';
import {UserContext} from '../context/UserContext';
import {colors, style, text} from '../styles';
import Screen from './Screen';
import moment from 'moment';

const Ajustes = () => {
  const [editMode, setEditMode] = useState(false);
  const {user, setPropiedadUser, updateHijo, signOut, getUsuario} = useContext(
    UserContext,
  );

  useEffect(() => {
    getUsuario();
  }, []);

  const renderUsuario = () => {
    if (user && user !== null) {
      let {nombre_hijo, fecha_nacimiento} = user;
      fecha_nacimiento = moment(fecha_nacimiento).format('YYYY-MM-DD');
      let fecha_object = {
        dia: fecha_nacimiento.substring(8),
        mes: parseInt(fecha_nacimiento.substring(5, 7)),
        year: fecha_nacimiento.substring(0, 4),
      };
      if (fecha_object.dia[0] === '0') {
        fecha_object.dia = fecha_object.dia[1];
      }
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
          <Text style={[text.p, {marginBottom: 16}]}>{nombre_hijo}</Text>
          <Text style={[text.h4]}>Fecha de Nacimiento</Text>
          <Text style={[text.p, {marginBottom: 16}]}>
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
      <View style={[style.padding, {paddingTop: 0, height: 900}]}>
        <Text style={[text.h1, style.bold]}>Ajustes</Text>
        <Text>Notificaciones</Text>
        <Text style={[text.h3, style.bold, style.mt]}>Datos de tu hijo(a)</Text>
        {renderUsuario()}
        <Button
          title="Cerrar Sesión"
          containerStyle={[
            style.mainButtonInner,
            {width: 100, marginTop: 32, padding: 0},
          ]}
          buttonStyle={{backgroundColor: 'transparent', margin: 0, padding: 0}}
          titleStyle={{color: colors.danger}}
          onPress={signOut}
        />
      </View>
    </Screen>
  );
};

export default Ajustes;
