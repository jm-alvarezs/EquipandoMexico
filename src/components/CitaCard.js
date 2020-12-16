import React from 'react';
import {Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {style, text, colors} from '../styles';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const CitaCard = ({cita, setCita, hideCancelar}) => {
  const {experto, titulo, fechaHoraInicio} = cita;

  const navigation = useNavigation();

  return (
    <Card containerStyle={[style.mx0, {borderRadius: 10, borderWidth: 0}]}>
      <Card.Title style={[text.h4, {textAlign: 'left', marginBottom: 6}]}>
        {titulo} {experto}
      </Card.Title>
      <Text>Día {moment(fechaHoraInicio).format('DD MMM YYYY')}</Text>
      <Text>Hora {moment(fechaHoraInicio).format('HH:mm')}</Text>
      {!hideCancelar && (
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
            setCita(cita);
            navigation.navigate('Cancelar', {idCita: cita.idCita});
          }}
        />
      )}
    </Card>
  );
};

export default CitaCard;
