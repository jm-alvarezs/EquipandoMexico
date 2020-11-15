import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import ContenidoCard from '../components/ContenidoCard';
import {ContenidosContext} from '../context/ContenidosContext';
import {colors, style, text} from '../styles';
import Screen from './Screen';

const Contenido = () => {
  const {contenidos, getContenidos} = useContext(ContenidosContext);

  useEffect(() => {
    getContenidos();
  }, []);

  const renderContenidos = () => {
    if (contenidos && contenidos !== null) {
      return contenidos.map((contenido) => (
        <ContenidoCard
          idContenido={contenido.idContenido}
          contenido={contenido}
        />
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Contenido">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Contenido</Text>
        <ScrollView>{renderContenidos()}</ScrollView>
      </View>
    </Screen>
  );
};

export default Contenido;
