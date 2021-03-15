import { GET_SIZES, GET_PRODUCTS_SIZE, GET_ALL_PRODUCTS, GET_PRODUCT, ID_PRODUCT, GET_LOGIN, SING_UP } from "./Actions.js";

const initialState = {
    sizes: [],
    products: [],
    product: [],
    id: 0,
    login: 0,
    singup: false,       
};

export default function rootReducer(state = initialState, action) {
  switch (action.type){

    case GET_SIZES:

        return {
           ...state,
           sizes: action.payload,
        }
        
    case GET_PRODUCTS_SIZE:

        var arr2=[];
        action.payload.products.map(product => arr2.push({name: product.name,
            id: product.id,
            price : product.price,
            pricelister : product.pricelister,
            description : product.description,
            marca: product.marca,
            images: product.images,
            sizes: product.sizes
        }))

        return {
            ...state,
            products: arr2,
        }
    
    case GET_ALL_PRODUCTS:

        var arr= [];
 
        action.payload.map(product => arr.push({name: product.name,
        id: product.id,
        price : product.price,
        pricelister : product.pricelister,
        description : product.description,
        marca: product.marca,
        images : product.images,
        sizes: product.sizes}))

        return {
            ...state,
            products: arr,
        }

    case GET_PRODUCT:


        return {
            ...state,
            product: action.payload,
        }

    case ID_PRODUCT:

        return {
            ...state,
            id: action.payload,
        }

    case GET_LOGIN:

        return {
            ...state,
            login: action.payload,
        }

    case SING_UP:

        return {
            ...state,
            singup: action.payload,
        }

      
    default:
        
        return {
            ...state
        }
    }
}
