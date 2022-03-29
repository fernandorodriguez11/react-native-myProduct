/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { Ubicacion } from '../interfaces/interface-producto';

interface Props {
    ubicacion: string,
    ubicaciones: Ubicacion[],
    onChange: (value: string) => void,
}

const SelectPicker = ({ubicacion, ubicaciones, onChange}: Props) => {

  return (
    <Picker
        selectedValue={ubicacion}
        onValueChange={(value) => onChange(value)}>
        {
        ubicaciones.map( u => (
            <Picker.Item label={u.nombre} value={u._id} key={u._id}/>
        ))
        }
    </Picker>
  );
}

export default SelectPicker;
