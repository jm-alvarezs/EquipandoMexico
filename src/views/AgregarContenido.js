import React, {useContext} from 'react';
import {TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {ContenidosContext} from '../context/ContenidosContext';
import {style} from '../styles';
import Screen from './Screen';

const AgregarContenido = () => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [contenido, setContenido] = useState('');
  const [tema, setTema] = useState('');

  const {postContenido} = useContext(ContenidosContext);

  return (
    <Screen title="Agregar Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text>Contenido</Text>
        <TextInput
          value={titulo}
          onChangeText={(titulo) => setTitulo(titulo)}
        />
        <Text>Tipo de Contenido</Text>
        <TextInput value={tipo} onChangeText={(tipo) => setTipo(tipo)} />
        <Text>Tema</Text>
        <TextInput value={tema} onChangeText={(tema) => setTema(tema)} />
        <Text>Contenido</Text>
        <TextInput
          value={contenido}
          onChangeText={(contenido) => setContenido(contenido)}
        />
        <Button
          title="Guardar"
          onPress={() => postContenido(titulo, tipo, tema, contenido)}
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
        />
      </View>
    </Screen>
  );
};

export default AgregarContenido;
