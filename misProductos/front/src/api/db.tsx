/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://my-productos.herokuapp.com/api/productos';
//const baseURL = 'http://192.168.1.171:4000/api/productos';
const myProductsApi = axios.create({baseURL});

/**Para cuando utilice el token
 * //Middleware de axios. Cada vez que hagamos una petición y sea un request haremos este middleware.
cafeApi.interceptors.request.use(
   async (config: any) => {

       //Guardo el valor del AsynStorage en la variable token
       const token = await AsyncStorage.getItem('token');

       if (token){
           //Hacemos que todas las peticiones de la api contengan este token en la cabezera headers.
           config.headers['x-token'] = token;
       }

       return config;
   }
);
 */

export default myProductsApi;

