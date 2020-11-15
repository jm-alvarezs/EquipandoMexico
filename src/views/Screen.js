import React from 'react';
import {View} from 'react-native';
import Header from '../components/Header';

const Screen = ({title, children}) => {
  return (
    <View>
      <Header title={title} />
      {children}
    </View>
  );
};

export default Screen;
