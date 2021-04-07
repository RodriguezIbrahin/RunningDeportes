import axios from "axios";
import {URL} from "../Api";

export const GET_SIZES = "GET_SIZES";
export const GET_PRODUCTS_SIZE = "GET_PRODUCTS_SIZE";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_CART = "GET_CART";
export const ID_PRODUCT = "ID_PRODUCT";
export const SING_IN = "SING_IN";
export const SING_UP = "SING_UP";
export const CART_NOT = "CART_NOT";
export const GET_CART_NOT_REGISTER  = "GET_CART_NOT_REGISTER ";
export const RESET_CART_NOT = "RESET_CART_NOT";
export const DELETE_CART_NOT = "DELETE_CART_NOT"; 
export const UP_DOWN_CART_NOT = "UP_DOWN_CART_NOT";
export const PAYMENT_CARD = "PAYMENT_CARD";
export const PAYMENT_EFECT = "PAYMENT_EFECT";
export const GET_ORDER_CONFIRMED = "GET_ORDER_CONFIRMED";
export const GET_ALL_ORDER_CONFIRMED = "GET_ALL_ORDER_CONFIRMED";

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

export function GetCart() {
  return function (dispatch) {
    return axios.get(`${URL}/quantity/open`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_CART, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function DeleteProductCart(payload) {
  return function (dispatch) {
    return axios.delete(`${URL}/quantity/${payload.products}/${payload.size}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(ress => {
        return axios.get(`${URL}/quantity/open`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      })
      .then(response => {
        dispatch({ type: GET_CART, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function UpDownProductCart(payload) {
  return function (dispatch) {
    return axios.put(`${URL}/quantity/`, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(ress => {
        return axios.get(`${URL}/quantity/open`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      })
      .then(response => {
        dispatch({ type: GET_CART, payload: response.data });
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

export function SingIn(payload){
  return{
    type: SING_IN,
    payload
  }
}

export function SignUp(payload){
  return{
    type: SING_UP,
    payload
  }
}

export function CartNoRegister(payload){
  return{
    type: CART_NOT,
    payload
  }
}

export function GetCartNoRegister(payload) {
  return async function (dispatch) {
    
    try {

      const products = await Promise.all( payload.map( async payloa => {

        const product = await axios.get(`${URL}/products/${payloa.products}`)

        return  {
          id: product.data.id,
          name: product.data.name,
          price: product.data.price,
          pricelister: product.data.pricelister,
          marca: product.data.marca,
          size: payloa.size,
          quantity: payloa.quantity,
          images: product.data.images[0].img
        }
      }));

      dispatch({ type: GET_CART_NOT_REGISTER , payload: [{order: 321, status: "open", products: products}] });

    }
    catch(err){ console.log(err) };
  }
};

export function ResetCartNoRegister(){
  return{
    type: RESET_CART_NOT,
  }
}

export function DeleteCartNoRegister(payload){
  return{
    type: DELETE_CART_NOT,
    payload
  }
}

export function UpDownCartNoRegister(payload){
  return{
    type: UP_DOWN_CART_NOT,
    payload
  }
}

export function SetPaymentCard(payload){
  return{
    type: PAYMENT_CARD,
    payload
  }
}

export function SetPaymentEfect(payload){
  return{
    type: PAYMENT_EFECT,
    payload
  }
}


export function GetOrdenConfirmed() {
  return function (dispatch) {
    return axios.get(`${URL}/quantity/confirmed`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_ORDER_CONFIRMED, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};

export function GetAllOrdenConfirmed() {
  return function (dispatch) {
    return axios.get(`${URL}/orders`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_ALL_ORDER_CONFIRMED, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      }
    );
  }
};