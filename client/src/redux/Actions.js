import axios from "axios";
import {URL} from "../Api";

export const GET_SIZES = "GET_SIZES";
export const GET_PRODUCTS_SIZE = "GET_PRODUCTS_SIZE";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const ID_PRODUCT = "ID_PRODUCT";
export const GET_LOGIN = "GET_LOGIN";
export const SING_UP = "SING_UP";

export function GetSizes() {
  return function (dispatch) {
    return axios.get(`${URL}/sizes`)
      .then(response => {
        dispatch({ type: GET_SIZES, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function GetProductsSize(payload) {
  return function (dispatch) {
    return axios.get(`${URL}/sizes/${payload}`)
      .then(response => {
        dispatch({ type: GET_PRODUCTS_SIZE, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function GetAllProducts() {
  return function (dispatch) {
    return axios.get(`${URL}/products/`)
      .then(response => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function GetProduct(payload) {
  return function (dispatch) {
    return axios.get(`${URL}/products/${payload}`)
      .then(response => {
        dispatch({ type: GET_PRODUCT, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function GetIdProduct(payload){
  return{
    type: ID_PRODUCT,
    payload
  }
}


export function GetLogin(payload){
  return{
    type: GET_LOGIN,
    payload
  }
}


export function SingUp(payload){
  return{
    type: SING_UP,
    payload
  }
}
