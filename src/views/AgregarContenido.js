import React, {useContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {ContenidosContext} from '../context/ContenidosContext';
import DocumentPicker from 'react-native-document-picker';
import {style, text} from '../styles';
import Screen from './Screen';

const AgregarContenido = () => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [contenido, setContenido] = useState('');
  const [file, setFile] = useState(null);
  const [enlace, setEnlace] = useState('');

  const handleFile = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    setFile(result);
  };

  const {postContenido} = useContext(ContenidosContext);

  return (
    <Screen title="+ Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.mb]}>Contenido</Text>
        <Text style={[text.p, style.bold]}>Título</Text>
        <TextInput
          value={titulo}
          onChangeText={(titulo) => setTitulo(titulo)}
        />
        <Text style={[text.p, style.bold]}>Tipo de Contenido</Text>
        <TextInput value={tipo} onChangeText={(tipo) => setTipo(tipo)} />
        <Text style={[text.p, style.bold]}>Contenido</Text>
        <TextInput
          value={contenido}
          onChangeText={(contenido) => setContenido(contenido)}
        />
        <Text style={[text.p, style.bold]}>Enlace (opcional)</Text>
        <TextInput
          value={enlace}
          onChangeText={(enlace) => setEnlace(enlace)}
        />
        <Text style={[text.p, style.bold]}>Multimedia</Text>
        <Button
          title="Seleccionar Archivo"
          onPress={handleFile}
          containerStyle={[style.my]}
        />
        <Button
          title="Guardar"
          onPress={() => postContenido({titulo, tipo, file, contenido})}
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
        />
      </View>
    </Screen>
  );
};

export default AgregarContenido;
