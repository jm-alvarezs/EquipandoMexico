import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import ContenidoCard from '../components/ContenidoCard';
import {ContenidosContext} from '../context/ContenidosContext';
import {UserContext} from '../context/UserContext';
import {colors, style, text} from '../styles';
import Screen from './Screen';

const Contenidos = () => {
  const {user} = useContext(UserContext);
  const {contenidos, getContenidos} = useContext(ContenidosContext);

  const navigation = useNavigation();

  useEffect(() => {
    getContenidos();
  }, []);

  const renderContenidos = () => {
    if (contenidos && contenidos !== null) {
      if (contenidos.length === 0) {
        return (
          <Text style={[text.p, style.mt]}>
            Lo sentimos. Aún no hay contenido.
          </Text>
        );
      }
      return contenidos.map((contenido) => (
        <ContenidoCard
          key={contenido.idContenido}
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
        <Text style={[text.h1, style.bold]}>Contenidos</Text>
        {user.admin !== null && (
          <Button
            title="+ Contenido"
            containerStyle={[style.mainButton, style.mt]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => navigation.navigate('AgregarContenido')}
          />
        )}
        <ScrollView style={[style.mt]}>{renderContenidos()}</ScrollView>
      </View>
    </Screen>
  );
};

export default Contenidos;
