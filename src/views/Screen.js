import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header';

const Screen = ({title, children}) => {
  return (
    <ScrollView>
      <Header title={title} />
      {children}
    </ScrollView>
  );
};

export default Screen;
