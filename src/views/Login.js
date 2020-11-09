import React, {useContext, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {UserContext} from '../context/UserContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(UserContext);

  const handleSubmit = () => {
    signIn(email, password);
  };

  return (
    <View>
      <Text>Entrar</Text>
      <TextInput onChangeText={(email) => setEmail(email)} value={email} />
      <TextInput
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;
