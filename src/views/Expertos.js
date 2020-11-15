import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ExpertoCard from '../components/ExpertoCard';
import {ExpertosContext} from '../context/ExpertosContext';

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
  };

  return (
    <View>
      <Text>Expertos</Text>
      <ScrollView>{renderExpertos()}</ScrollView>
    </View>
  );
};

export default Expertos;
