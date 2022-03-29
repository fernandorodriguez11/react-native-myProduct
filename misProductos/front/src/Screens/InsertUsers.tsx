/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import Input from '../components/Input';
import useForm from '../hooks/useForm';
import { UsuarioInsert } from '../interfaces/interface-usuario';
import { estilos } from './InsertProduct';
import { AuthContext } from '../context/AuthContext';
import { validate } from './Login';

const roles = [
  {
    key: 1,
    label: 'ADMIN',
    rol: 'ROLE_ADMIN',
  },
  {
    key: 2,
    label: 'USER',
    rol: 'ROLE_USER',
  },
]

const InsertUsers = () => {

  const {onChange, email, password, confirmPassword, rol, username} = useForm({
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'ROLE_USER',
    username: '',
  });

  const [error, setError] = useState<string>('');
  const [mensaje, setMensaje] = useState('');
  const {insertarUsuario} = useContext(AuthContext);

  useEffect(() => {
    
    
    
  }, [error]);
  

  const insertar = () => {
      
    var token: string = '';

    for (var i = 0; i <= 12; i++){
      token += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
    }

    if (password !== confirmPassword) {
      
      setError('* Las contraseñas no coinciden');
    
    } else if (!validate(email)) { 
      setMensaje('No es un email válido');
    } else {

      const usuario: UsuarioInsert = {
        username,
        email,
        password,
        rol,
        token,
      }

      insertarUsuario(usuario);

      setError('');

    }

  }


  return (

    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Insertar Usuarios</Text>

      <View style={estilos.formulario}>
        {
          mensaje === '' 
          ? <></> 
          : <Text style={{fontSize: 14, color: 'red', paddingLeft: 40}}> {mensaje} </Text>
        }
        <Input 
          valor={email} 
          placeholder='emailPrueba@gmail.com'
          keyboardType='email-address' 
          autoCapitalize='none' 
          onChange={(value) => onChange(value, 'email')} />

        {
          error === '' 
          ? <></> 
          : <View style={{width: '100%', marginTop: 5}}>
              <Text style={{fontSize: 14, color: 'red', paddingLeft: 40}}> {error} </Text>
            </View>
        }

        <Input 
          valor={password} 
          placeholder='*************'
          keyboardType='default' 
          autoCapitalize='none'
          secureText={true}
          onChange={(value) => {onChange(value, 'password') 
          if (password.length < 8) {
            setError('La contraseña debe de tener una longitud mínima de 8 caracteres');
          } else {setError('');}}} />
        
        <Input 
          valor={confirmPassword} 
          placeholder='*************'
          keyboardType='default' 
          autoCapitalize='none'
          secureText={true}
          onChange={(value) => onChange(value, 'confirmPassword')} />

        <Picker
          style={estilos.inputs}
          selectedValue={rol}
          onValueChange={(value) => onChange(value!, 'rol')}>
          {
            roles.map( r => (
              <Picker.Item label={r.label} value={r.rol} key={r.key} />
            ))
          }
        </Picker>

        <Input 
          valor={username} 
          placeholder='Introduce el username'
          keyboardType='default' 
          autoCapitalize='words' 
          onChange={(value) => onChange(value, 'username')} />

        <View style={estilos.botonInsertar} >
          <Button 
              title='Insertar Usuario'
              onPress={insertar}
              color='#5856D6'
          />
        </View>


      </View>

      </ScrollView>
    
  )
}

export default InsertUsers;
