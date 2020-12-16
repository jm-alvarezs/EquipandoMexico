import React, {useContext, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Card, Button} from 'react-native-elements';
import {AnaliticasContext} from '../context/AnaliticasContext';
import {UserContext} from '../context/UserContext';
import {colors, layout, style, text} from '../styles';
import Screen from './Screen';

const Analiticas = () => {
  const {citas, usuarios, usuariosdia, getUsuarios, getCitas} = useContext(
    AnaliticasContext,
  );

  const {signOut} = useContext(UserContext);

  useEffect(() => {
    getUsuarios();
    getCitas();
  }, []);

  const renderTotalUsuarios = () => {
    console.log(usuarios);
    if (usuarios && usuarios !== null) {
      return (
        <View style={[layout.row]}>
          <View style={[layout.half]}>
            <Text style={[text.h3]}>Usuarios Totales</Text>
          </View>
          <View style={[layout.half, {alignItems: 'center'}]}>
            <Text style={[text.h3]}>{usuarios}</Text>
          </View>
        </View>
      );
    }
  };

  const renderGrafica = () => {
    if (usuariosdia && usuarios !== null) {
      if (usuariosdia.length === 0) {
        return (
          <Text style={[text.p]}>
            No hay usuarios registrados en el último mes.
          </Text>
        );
      }
      return (
        <LineChart
          data={{
            datasets: [
              {
                labels: usuariosdia.map((usuario) => usuario.fecha),
                data: usuariosdia.map((usuario) => usuario.usuarios),
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.825} // from react-native
          height={300}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => colors.accent,
          }}
          style={{marginLeft: -12, marginBottom: -12}}
          bezier
        />
      );
    }
  };

  const renderCitas = () => {
    if (citas && citas !== null) {
      return citas.map(({nombre, citas}) => (
        <View key={nombre} style={[layout.row]}>
          <View style={[layout.half]}>
            <Text style={[text.h4]}>{nombre}</Text>
          </View>
          <View style={[layout.half, {alignItems: 'center'}]}>
            <Text style={[text.h4]}>{citas}</Text>
          </View>
        </View>
      ));
    }
  };

  return (
    <Screen title="Analiticas">
      <View style={[layout.padding, {paddingTop: 0}]}>
        <Text style={[text.h1]}>Analiticas</Text>
        <Card
          containerStyle={[
            {borderRadius: 10, borderWidth: 0, marginHorizontal: 0},
          ]}>
          {renderTotalUsuarios()}
        </Card>
        <Text style={[text.h3, style.bold, {marginTop: 12}]}>
          Registros Diarios
        </Text>
        <Card
          containerStyle={[
            {borderRadius: 10, borderWidth: 0, marginHorizontal: 0},
          ]}>
          {renderGrafica()}
        </Card>
        <Text style={[text.h3, style.bold, {marginTop: 12}]}>
          Citas por Experto
        </Text>
        <Card
          containerStyle={[
            {borderRadius: 10, borderWidth: 0, marginHorizontal: 0},
          ]}>
          {renderCitas()}
        </Card>
        <Button
          title="Cerrar Sesión"
          containerStyle={[
            style.mainButtonInner,
            {width: 100, marginTop: 32, padding: 0},
          ]}
          buttonStyle={[style.mainButtonInner, {padding: 0}]}
          titleStyle={{color: colors.danger}}
          onPress={signOut}
        />
      </View>
    </Screen>
  );
};

export default Analiticas;
