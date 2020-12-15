import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import CitaCard from '../components/CitaCard';
import {CitasContext} from '../context/CitasContext';
import {style, text, colors} from '../styles';
import Screen from './Screen';
import {useNavigation} from '@react-navigation/native';

const Citas = () => {
  const {citas, getMisCitas} = useContext(CitasContext);

  const navigation = useNavigation();

  useEffect(() => {
    getMisCitas();
  }, []);

  const renderCitas = () => {
    if (citas && citas !== null) {
      if (citas.length === 0) {
        return (
          <Text style={[text.p, {marginBottom: 12}]}>
            Aún no tienes citas. ¡Agenda una!
          </Text>
        );
      }
      return citas.map((cita) => <CitaCard key={cita.idCita} cita={cita} />);
    }
    return <ActivityIndicator color={colors.dark} />;
  };

  return (
    <Screen title="Citas">
      <View style={[style.padding, {paddingTop: 0}]}>
        <Text style={[text.h1, style.bold]}>Mis Citas</Text>
        <ScrollView>{renderCitas()}</ScrollView>
        <Button
          title="Agendar"
          containerStyle={[style.mainButton]}
          buttonStyle={[style.mainButtonInner]}
          onPress={() => navigation.navigate('Expertos')}
        />
      </View>
    </Screen>
  );
};

export default Citas;
