/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import axios from "axios";

const baseURL = 'https://my-productos.herokuapp.com/api/';
//const baseURL = 'http://192.168.1.171:4000/api/productos';
const myProductsApi = axios.create({baseURL});

export default myProductsApi;
