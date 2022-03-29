/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
import {useState} from 'react';

const useForm = <T extends Object>(initialState: T) => {

    const [state, setState] = useState(initialState);

    const onChange = <K extends Object>(valor: K, field: keyof T) => {
        setState({
            ...state,
            [field]: valor
        });
    }

    return {
        ...state,
        form: state,
        onChange,
    }
};

export default useForm;
