import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, layout, style} from '../styles';

const Header = ({title}) => {
  return (
    <View style={[layout.row, headerStyle.container, style.shadow]}>
      <View style={[layout.third]}></View>
      <View style={[layout.third, layout.center]}>
        <Text style={[style.textWhite, style.bold]}>{title}</Text>
      </View>
      <View style={[layout.third]}></View>
    </View>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    padding: 16,
    marginTop: 0,
  },
});

export default Header;
