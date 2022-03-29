/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import useForm from '../hooks/useForm';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import { ProductsContext } from '../context/Productos/ProductsContext';
import { ProductoInsert } from '../interfaces/interface-producto';
import Input from '../components/Input';

const InsertProduct = () => {

  const {onChange, nombre, tienda, ubicacion, tipo} = useForm({
    nombre: '',
    tienda: '',
    ubicacion: '',
    tipo: '',
  });
  
  const {ubicaciones, tipos, insertarProductos} = useContext(ProductsContext);
  //Para guardar la direccion de la foto temporal
  const [imagen, setImagen] = useState<string>('');

  const takePhoto = () => {

    launchCamera({
      mediaType: 'photo',
      quality: 0.2,
    }, (resp) => {
      //Si cancelo no hacemos nada mas
      if (resp.didCancel) return;

      //si no viene la dirección
      if (resp.assets !== undefined){
        if (!resp.assets[0].uri) return;
        setImagen(resp.assets[0].uri);
        //uploadImage(resp, _id);

      }
      
    });
  }

  const takePhotoFromGalery = () => {

    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.2,
    }, (resp) => {

      if (resp.didCancel) return;

      if (resp.assets !== undefined){
        if (!resp.assets[0].uri) return;

        setImagen(resp.assets[0].uri);
        //uploadImage(resp, _id);

      }
      
    });
  }

  const insertar = () => {

    if (nombre === ''){} else if (tienda === ''){} else
    if (imagen === ''){} else
    if (ubicacion === ''){} else
    if (tipo === ''){} else {
      const producto: ProductoInsert = {
        nombre,
        tienda,
        ubicacionId: ubicacion,
        tipoId: tipo,
        imagen,
      }
  
      insertarProductos(producto);
      console.log(producto);
    }
    
  }

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Insertar Productos</Text>

      <View style={estilos.formulario}>
        
        <Input 
          valor={nombre} 
          placeholder='Nombre del producto' 
          keyboardType='default' 
          autoCapitalize='words' 
          onChange={(value) => onChange(value, 'nombre')} />

        <Input 
          valor={tienda} 
          placeholder='Nombre de la tienda' 
          keyboardType='default' 
          autoCapitalize='none' 
          onChange={(value) => onChange(value, 'tienda')} />

        <Picker
          style={estilos.inputs}
          selectedValue={ubicacion}
          onValueChange={(value) => onChange(value!, 'ubicacion')}>
          {
            ubicaciones.map( u => (
              <Picker.Item label={u.nombre} value={u._id} key={u._id}/>
            ))
          }
        </Picker>

        <Picker
          style={estilos.inputs}
          selectedValue={tipo}
          onValueChange={(value) => onChange(value!, 'tipo')}>
          {
            tipos.map( t => (
              <Picker.Item label={t.tipo} value={t._id} key={t._id}/>
            ))
          }
        </Picker>
        
        <View style={{width: '100%', alignItems: 'center'}}>
          {
          imagen !== '' ? (<Image source={{ uri: imagen}} style={estilos.imagen} />) : <></>
          }
        </View>
        

        <View style={estilos.containerBotones} >
            <Button 
              title='Cámara'
              onPress={takePhoto} 
              color='#5856D6'
            />
            <View style={{width: 10}} />
            <Button 
              title='Galería'
              onPress={takePhotoFromGalery}
              color='#5856D6'
            />
        </View>
        
        <View style={estilos.botonInsertar} >
          <Button 
              title='Insertar'
              onPress={insertar}
              color='#5856D6'
          />
        </View>
        
      </View>
    </ScrollView>
  )
}

export const estilos = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  titulo: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
  },

  formulario: {
    width: '100%',
    height: '100%',
    marginTop: 5,
    flex: 1,
  },

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

  imagen: {
    width: 240,
    height: 200,
  },

  containerBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  botonInsertar:{
    width: '60%',
    marginLeft: '20%',
    marginTop: '2%',
    marginBottom: '3%',
  },

});

export default InsertProduct;
