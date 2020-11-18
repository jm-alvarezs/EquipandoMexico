import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import {style, text} from '../styles';
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
    if (moment(fechaNacimiento).isValid()) {
      const fecha = moment(fechaNacimiento).format('YYYY-MM-DD');
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
    </Screen>
  );
};

export default Hijo;
