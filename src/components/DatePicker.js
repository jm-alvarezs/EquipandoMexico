import React from 'react';
import {View} from 'react-native';
import {layout} from '../styles';
import {Picker} from '@react-native-picker/picker';

const DatePicker = ({fecha, modifier}) => {
  return (
    <View style={[layout.row, {width: '110%'}]}>
      <View style={[layout.third]}>
        <Picker
          selectedValue={fecha.dia}
          onValueChange={(dia, itemIndex) => modifier({...fecha, dia})}>
          {new Array(31).fill(1).map((one, index) => (
            <Picker.Item
              key={`dia-${index}`}
              label={String(index + 1)}
              value={String(index + 1)}
            />
          ))}
        </Picker>
      </View>
      <View style={[layout.third]}>
        <Picker
          selectedValue={fecha.mes}
          onValueChange={(mes, itemIndex) => modifier({...fecha, mes})}>
          <Picker.Item label="Enero" value={1} />
          <Picker.Item label="Febrero" value={2} />
          <Picker.Item label="Marzo" value={3} />
          <Picker.Item label="Abril" value={4} />
          <Picker.Item label="Mayo" value={5} />
          <Picker.Item label="Junio" value={6} />
          <Picker.Item label="Julio" value={7} />
          <Picker.Item label="Agosto" value={8} />
          <Picker.Item label="Septiembre" value={9} />
          <Picker.Item label="Octubre" value={10} />
          <Picker.Item label="Noviembre" value={11} />
          <Picker.Item label="Diciembre" value={12} />
        </Picker>
      </View>
      <View style={[layout.third]}>
        <Picker
          selectedValue={fecha.year}
          onValueChange={(year, itemIndex) => modifier({...fecha, year})}>
          {new Array(71).fill(1).map((one, index) => (
            <Picker.Item
              key={`year-${index}`}
              label={String(1950 + index)}
              value={String(1950 + index)}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DatePicker;
