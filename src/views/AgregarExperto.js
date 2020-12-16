import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-elements';
import {ExpertosContext} from '../context/ExpertosContext';
import {elements, style, text} from '../styles';
import Screen from './Screen';

const AgregarExperto = () => {
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState('');
  const [direccion, setDireccion] = useState({});
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState('');

  const {postExperto, created, spinner} = useContext(ExpertosContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (created) {
      navigation.navigate('Expertos');
    }
  }, [created]);

  const handleFile = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    setFile(result);
  };

  return (
    <Screen title="Agregar Experto">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.mb]}>Experto</Text>
        <Text style={[text.p]}>Título</Text>
        <TextInput
          value={titulo}
          style={elements.input}
          onChangeText={(titulo) => setTitulo(titulo)}
        />
        <Text style={[text.p]}>Nombre</Text>
        <TextInput
          value={nombre}
          style={elements.input}
          onChangeText={(nombre) => setNombre(nombre)}
        />
        <Text style={[text.p]}>Servicio</Text>
        <TextInput
          value={servicio}
          style={elements.input}
          onChangeText={(servicio) => setServicio(servicio)}
        />
        <Text style={[text.p]}>Ubicación</Text>
        <Text style={[text.p]}>Calle</Text>
        <TextInput
          value={direccion.calle}
          style={elements.input}
          onChangeText={(calle) => setDireccion({...direccion, calle})}
        />
        <Text style={[text.p]}>Número</Text>
        <TextInput
          value={direccion.numero}
          style={elements.input}
          onChangeText={(numero) => setDireccion({...direccion, numero})}
        />
        <Text style={[text.p]}>Número Interior</Text>
        <TextInput
          value={direccion.numero_int}
          style={elements.input}
          onChangeText={(numero_int) =>
            setDireccion({...direccion, numero_int})
          }
        />
        <Text style={[text.p]}>Colonia</Text>
        <TextInput
          value={direccion.colonia}
          style={elements.input}
          onChangeText={(colonia) => setDireccion({...direccion, colonia})}
        />
        <Text style={[text.p]}>Código Postal</Text>
        <TextInput
          value={direccion.codigo_postal}
          style={elements.input}
          onChangeText={(codigo_postal) =>
            setDireccion({...direccion, codigo_postal})
          }
        />
        <Text style={[text.p, style.bold]}>Fotografía (opcional)</Text>
        <Button
          title="Seleccionar Archivo"
          onPress={handleFile}
          containerStyle={[style.my]}
        />
        <Button
          title="Guardar"
          containerStyle={[
            spinner ? style.mainButtonInner : style.mainButton,
            style.mt,
          ]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() =>
            postExperto({nombre, servicio, direccion, file, titulo})
          }
          disabled={spinner}
        />
      </View>
    </Screen>
  );
};

export default AgregarExperto;
