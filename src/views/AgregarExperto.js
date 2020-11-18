import React, {useContext} from 'react';
import {View, Text, TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-elements';
import {ExpertosContext} from '../context/ExpertosContext';
import {style, text} from '../styles';
import Screen from './Screen';

const AgregarExperto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [file, setFile] = useState(null);

  const {postExperto} = useContext(ExpertosContext);

  const handleFile = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    setFile(result);
  };

  return (
    <Screen title="Agregar Experto">
      <View>
        <Text style={[text.h1]}>Experto</Text>
        <Text style={[text.h3]}>Nombre</Text>
        <TextInput
          value={nombre}
          onChangeText={(nombre) => setNombre(nombre)}
        />
        <Text style={[text.h3]}>Descripción</Text>
        <TextInput
          value={descripcion}
          onChangeText={(descripcion) => setDescripcion(descripcion)}
        />
        <Text style={[text.h3]}>Ubicación</Text>
        <TextInput
          value={ubicacion}
          onChangeText={(ubicacion) => setUbicacion(ubicacion)}
        />
        <Text>Fotografía (opcional)</Text>
        <Button title="Seleccionar Archivo" onPress={handleFile} />
        <Button
          title="Guardar"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => postExperto(nombre, descripcion, ubicacion, file)}
        />
      </View>
    </Screen>
  );
};

export default AgregarExperto;
