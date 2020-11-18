import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import ExpertoCard from '../components/ExpertoCard';
import {ExpertosContext} from '../context/ExpertosContext';
import {colors, style, text} from '../styles';
import Screen from './Screen';

const Expertos = () => {
  const {expertos, getExpertos} = useContext(ExpertosContext);

  const navigation = useNavigation();

  useEffect(() => {
    getExpertos();
  }, []);

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
        <ExpertoCard key={experto.idExperto} experto={experto} />
      ));
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Expertos">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Expertos</Text>
        <ScrollView>
          {renderExpertos()}
          <Button
            title="Agregar Experto"
            onPress={() => navigation.navigate('AgregarExperto')}
          />
        </ScrollView>
      </View>
    </Screen>
  );
};

export default Expertos;
