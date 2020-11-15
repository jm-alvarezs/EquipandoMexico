import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import ExpertoCard from '../components/ExpertoCard';
import {ExpertosContext} from '../context/ExpertosContext';
import {colors, style, text} from '../styles';
import Screen from './Screen';

const Expertos = () => {
  const {expertos, getExpertos} = useContext(ExpertosContext);

  useEffect(() => {
    getExpertos();
  }, []);

  const renderExpertos = () => {
    if (expertos && expertos !== null) {
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
        <ScrollView>{renderExpertos()}</ScrollView>
      </View>
    </Screen>
  );
};

export default Expertos;
