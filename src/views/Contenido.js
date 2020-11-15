import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ContenidoCard from '../components/ContenidoCard';

const Contenido = () => {
  const renderContenidos = () => {
    if (contenidos && contenidos !== null) {
      return contenidos.map((contenido) => (
        <ContenidoCard
          idContenido={contenido.idContenido}
          contenido={contenido}
        />
      ));
    }
  };

  return (
    <View>
      <Text>Contenido</Text>
      <ScrollView>{renderContenidos()}</ScrollView>
    </View>
  );
};

export default Contenido;
