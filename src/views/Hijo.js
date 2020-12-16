import React, {useContext, useState} from 'react';
import {View, TextInput} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import {layout, style, text} from '../styles';
import Screen from './Screen';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '../components/DatePicker';
import {UserContext} from '../context/UserContext';
import moment from 'moment';

const Hijo = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState({
    dia: '',
    mes: '',
    year: '',
  });
  const [sexo, setSexo] = useState('Hombre');

  const {postHijo} = useContext(UserContext);

  const handleSubmit = () => {
    let fecha = {
      day: fechaNacimiento.dia,
      month: fechaNacimiento.mes - 1,
      year: fechaNacimiento.year,
    };
    if (moment(fecha).isValid()) {
      fecha = moment(fecha).format('YYYY-MM-DD');
      postHijo(nombre, fecha, sexo);
    }
  };

  return (
    <Screen title="Datos de Hijo(a)">
      <Card>
        <Text style={[text.h1]}>Datos de tu Hijo</Text>
        <Text style={[text.p, style.bold]}>Nombre</Text>
        <TextInput
          value={nombre}
          onChangeText={(nombre) => setNombre(nombre)}
        />
        <Text style={[text.p, style.bold]}>Fecha de Nacimiento</Text>
        <DatePicker fecha={fechaNacimiento} modifier={setFechaNacimiento} />
        <Text style={[text.p, style.bold]}>Sexo</Text>
        <Picker
          selectedValue={sexo}
          onValueChange={(sexo, itemIndex) => setSexo(sexo)}>
          <Picker.Item label="Hombre" value="Hombre" />
          <Picker.Item label="Mujer" value="Mujer" />
        </Picker>
        <Button
          title="Guardar"
          containerStyle={[style.buttonPreguntaSelected]}
          buttonStyle={[style.mainButtonInner]}
          onPress={handleSubmit}
        />
      </Card>
      <View style={[layout.row]}>
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

export default Hijo;
