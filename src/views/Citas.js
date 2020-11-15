import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CitaCard from '../components/CitaCard';
import {CitasContext} from '../context/CitasContext';

const Citas = () => {
  const {citas, getMisCitas} = useContext(CitasContext);

  useEffect(() => {
    getMisCitas();
  }, []);

  const renderCitas = () => {
    if (citas && cotas !== null) {
      return citas.map((cita) => <CitaCard key={cita.idCita} cita={cita} />);
    }
  };

  return (
    <View>
      <Text>Mis Citas</Text>
      <ScrollView>{renderCitas()}</ScrollView>
    </View>
  );
};

export default Citas;
