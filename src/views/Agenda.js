import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {ExpertosContext} from '../context/ExpertosContext';
import {style, text, colors} from '../styles';
import Screen from './Screen';
import moment from 'moment';
import {EspaciosContext} from '../context/EspaciosContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Agenda = () => {
  const {espacios, setEspacio, getEspaciosExperto} = useContext(
    EspaciosContext,
  );

  const {experto, getExperto} = useContext(ExpertosContext);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const idExperto = route.params;
    getExperto(idExperto);
    getEspaciosExperto(idExperto);
  }, []);

  const renderExperto = () => {
    if (experto && experto !== null) {
      const {nombre, ubicacion, direccion} = experto;
      return (
        <View>
          <Text style={[text.h3, style.mt]}>{nombre}</Text>
        </View>
      );
    }
  };

  const renderEspacios = () => {
    if (espacios && espacios !== null && experto && experto !== null) {
      if (espacios.length === 0) {
        return (
          <Text style={[text.p, style.mt]}> No hay espacios disponibles</Text>
        );
      }
      return espacios.map((espacio) => (
        <TouchableOpacity
          key={espacio.idEspacio}
          onPress={() => {
            setEspacio(espacio);
            navigation.navigate('Confirmacion', {
              idEspacio: espacio.idEspacio,
            });
          }}>
          <Card
            containerStyle={[style.mx0, {borderRadius: 10, borderWidth: 0}]}>
            <Text style={[text.h4, style.bold]}>
              {moment(espacio.fechaHoraInicio).format('DD MMM YYYY')}
            </Text>
            <Text>
              {moment(espacio.fechaHoraInicio).format('HH:mm')} -{' '}
              {moment(espacio.fechaHoraInicio).format('DD MMM YYYY HH:mm')}
            </Text>
          </Card>
        </TouchableOpacity>
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Agenda">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Agenda</Text>
        {renderExperto()}
        {renderEspacios()}
      </View>
    </Screen>
  );
};

export default Agenda;
