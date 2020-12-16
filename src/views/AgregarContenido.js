import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {ContenidosContext} from '../context/ContenidosContext';
import DocumentPicker from 'react-native-document-picker';
import {elements, style, text} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const AgregarContenido = () => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [contenido, setContenido] = useState('');
  const [file, setFile] = useState(null);
  const [enlace, setEnlace] = useState('');

  const handleFile = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images, DocumentPicker.types.video],
    });
    setFile(result);
  };

  const {spinner, created, postContenido} = useContext(ContenidosContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (created) {
      navigation.navigate('Contenidos');
    }
  }, [created]);

  return (
    <Screen title="+ Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.mb]}>Contenido</Text>
        <Text style={[text.p, style.bold]}>Título</Text>
        <TextInput
          value={titulo}
          style={[elements.input]}
          onChangeText={(titulo) => setTitulo(titulo)}
        />
        <Text style={[text.p, style.bold]}>Tipo de Contenido</Text>
        <TextInput
          value={tipo}
          style={[elements.input]}
          onChangeText={(tipo) => setTipo(tipo)}
        />
        <Text style={[text.p, style.bold]}>Contenido</Text>
        <TextInput
          value={contenido}
          style={[elements.input]}
          onChangeText={(contenido) => setContenido(contenido)}
        />
        <Text style={[text.p, style.bold]}>Enlace (opcional)</Text>
        <TextInput
          value={enlace}
          style={[elements.input]}
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
          onPress={() => postContenido({titulo, tipo, file, contenido, enlace})}
          containerStyle={[
            spinner ? style.mainButtonInner : style.mainButton,
            style.mt,
          ]}
          buttonStyle={[style.mainButtonInner]}
        />
      </View>
    </Screen>
  );
};

export default AgregarContenido;
