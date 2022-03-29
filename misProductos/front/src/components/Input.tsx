/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
    valor: string,
    placeholder: string,
    autoCapitalize: 'none' | 'words',
    keyboardType: 'default' | 'email-address',
    secureText?: boolean,
    onChange: (value: any) => void,
}

const Input = ({valor, placeholder, keyboardType, autoCapitalize, onChange, secureText}: Props) => {
  return (
    <TextInput
          style={inputStyle.inputs}
          autoCorrect={false}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          value={valor}
          secureTextEntry={secureText}
          onChangeText={onChange}
    />
  )
}

const inputStyle = StyleSheet.create({

    inputs: {
      width: '80%',
      marginLeft: '10%',
      backgroundColor: '#F9F9F9',
      borderColor: '#4BCAEC',
      borderWidth: 2,
      marginVertical: 10,
      borderRadius: 50,
      paddingLeft: 15,
      color: 'black',
    },
});

export default Input;
