import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {CitasContext} from '../context/CitasContext';
import {style, text, colors} from '../styles';
import Screen from './Screen';
import CitaCard from '../components/CitaCard';
import {useNavigation} from '@react-navigation/native';

const Cancelar = () => {
  const {cita, deleteCita} = useContext(CitasContext);

  const renderCita = () => {
    if (cita && cita !== null) {
      return <CitaCard key={cita.idCita} cita={cita} hideCancelar />;
    }
  };

  const navigation = useNavigation();

  return (
    <Screen title="Precaución">
      <View style={[style.padding]}>
        <Text style={[text.h2, style.bold]}>
          ¿Realmente quieres cancelar esta cita?
        </Text>
        {renderCita()}
        <Button
          title="Cancelar"
          containerStyle={[
            style.mainButtonInner,
            {width: 100, marginTop: 32, padding: 0, marginHorizontal: 0},
          ]}
          buttonStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            marginHorizontal: 0,
          }}
          titleStyle={{color: colors.danger}}
          onPress={() => {
            deleteCita(cita);
            navigation.navigate('Citas');
          }}
        />
      </View>
    </Screen>
  );
};

export default Cancelar;
