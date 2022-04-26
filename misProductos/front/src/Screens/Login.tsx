/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Keyboard, Alert } from 'react-native';

import useForm from '../hooks/useForm';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginSt } from '../themes/loginTheme';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from 'react-native-splash-screen';

export const validate = (correo: string) => {

  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(correo).toLowerCase())
}

const Login = () => {

  const {signIn, errorMessage, removeError, valido: vali} = useContext(AuthContext);
  const [mensaje, setMensaje] = useState('');

  const [valido, setValido] = useState(true);
  const [validoEmail, setValidoEmail] = useState(true);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    
    if(errorMessage.length === 0) return;

    Alert.alert(
        'Login Incorrecto', 
        errorMessage,
        [
            {
                text: 'OK',
                onPress: removeError,
            },
        ]
    );

  }, [errorMessage]);

  const [visible, isVisible] = useState(true);

  /**
   * Función encargada de cambiar la visibilidad del campo de la contraseña.
   * Si es verdadero lo pongo en false y si es false a true.
   */
  const passwordVisibility = () => {

    if (visible){
      isVisible(false);
    } else {
      isVisible(true);
    }

  }

  const loginSession = () => {

    Keyboard.dismiss();
    console.log(vali);
    if(validate(email)){
      signIn({email, password});
      
      if(!vali){
        setValido(false);
        setValidoEmail(false);
      }else{
        setValido(true);
        setValidoEmail(true);
        
      }
      setMensaje('');
    }else{
      setMensaje('Email invalido');
      setValidoEmail(false);
    }
  }

  return (
    <View style={loginSt.contenedor} >

      <Text style={loginSt.titulo} >Login To MyProducts</Text>
      
      <TextInput
        style={validoEmail ? loginSt.inputs : [{...loginSt.inputs, borderColor: 'red'}]}
        autoCorrect={false}
        placeholder='Ingrese su email'
        autoCapitalize='none'
        keyboardType='email-address'
        value={email}
        onChangeText={(value) => onChange(value, 'email')}
      />
      {
        mensaje === '' ? <></> : <Text style={loginSt.eror}> {mensaje} </Text>
      }
      <View style={loginSt.contenedorPassword} >
        <TextInput
          style={valido ? loginSt.inputs : [{...loginSt.inputs, borderColor: 'red'}]}
          autoCorrect={false}
          placeholder='*****************'
          secureTextEntry={visible}
          keyboardType='default'
          value={password}
          onChangeText={(value) => onChange(value, 'password')}
        />

        {visible
          ? <Icon style={loginSt.icono} name='eye-outline' size={20} onPress={passwordVisibility} />
          : <Icon style={loginSt.icono}  name='eye-off-outline' size={20} onPress={passwordVisibility} />
        }
      </View>

      <View style={{width: '70%', marginTop: 20}}>
        <Button title='Iniciar Sesión' onPress={loginSession} />
      </View>

    </View>
  );
}

export default Login;
