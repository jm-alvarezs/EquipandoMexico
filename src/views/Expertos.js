import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import ExpertoCard from '../components/ExpertoCard';
import {ExpertosContext} from '../context/ExpertosContext';
import {UserContext} from '../context/UserContext';
import {colors, style, text} from '../styles';
import {getCoords} from '../utils/geolocation';
import Screen from './Screen';

const Expertos = () => {
  const {user} = useContext(UserContext);
  const {expertos, getExpertos} = useContext(ExpertosContext);

  const navigation = useNavigation();

  useEffect(() => {
    getExpertosCoords();
  }, []);

  const getExpertosCoords = async () => {
    getCoords((coords) => {
      const {latitude, longitude} = coords;
      getExpertos(latitude, longitude);
    });
  };

  const renderExpertos = () => {
    if (expertos && expertos !== null) {
      if (expertos.length === 0) {
        return (
          <Text style={[text.p, {marginTop: 12}]}>
            Lo sentimos. No hay expertos cerca de ti.
          </Text>
        );
      }
      return expertos.map((experto) => (
        <ExpertoCard
          key={experto.idExperto}
          experto={experto}
          hideAgendar={user.idUsuario !== null}
        />
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Expertos">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Expertos</Text>
        {user.idUsuario !== null && (
          <Button
            title="Agregar Experto"
            containerStyle={[style.mainButton, style.mt]}
            buttonStyle={[style.mainButtonInner]}
            onPress={() => navigation.navigate('AgregarExperto')}
          />
        )}
        <ScrollView>{renderExpertos()}</ScrollView>
      </View>
    </Screen>
  );
};

export default Expertos;
