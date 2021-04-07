import { 
    GET_SIZES, GET_PRODUCTS_SIZE, GET_ALL_PRODUCTS, GET_PRODUCT, ID_PRODUCT, SING_IN, SING_UP, GET_CART, CART_NOT,
    GET_CART_NOT_REGISTER, RESET_CART_NOT, DELETE_CART_NOT, UP_DOWN_CART_NOT, PAYMENT_CARD, PAYMENT_EFECT,
    GET_ORDER_CONFIRMED, GET_ALL_ORDER_CONFIRMED
} from "./Actions.js";

const initialState = {
    
    sizes: [],
    products: [],
    product: [],
    cart: [],
    id: 0,
    singin: false,
    signup: false,
    cartNoRegister: [],
    getCartNoRegister: [],
    paymentCard: {},
    paymentEfec: {},
    orderConfirmed: [],
    allOrderConfirmed: [],

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

    case SING_IN:

        return {
            ...state,
            singin: action.payload,
        }

    case SING_UP:

        return {
            ...state,
            signup: action.payload,
        }

    case GET_CART:

        return {
            ...state,
            cart: action.payload,
        }

    case CART_NOT:

        const result = state.cartNoRegister.filter(ar => ar && ar.products === action.payload.products && ar.size === action.payload.size);
        
        if(result.length){
            return {...state}
        }
        if(!result.length){

            localStorage.setItem( "cartNoRegister", JSON.stringify(state.cartNoRegister.concat([action.payload])) );

            return {
                ...state,
                cartNoRegister: state.cartNoRegister.concat([action.payload]),
            }
        }

    case GET_CART_NOT_REGISTER:

        return {
            ...state,
            getCartNoRegister: action.payload,
        }

    case RESET_CART_NOT:

        return {
            ...state,
            cartNoRegister: [],
        }

    case DELETE_CART_NOT:

        let restantes = [];
  
        state.cartNoRegister.map( cart => { if( cart && cart.product !== action.payload.products && cart.size !== action.payload.size){ restantes.push(cart)}} )
        
        localStorage.setItem( "cartNoRegister", JSON.stringify( restantes ));

        return {
            ...state,
            cartNoRegister: restantes,
        }


    case UP_DOWN_CART_NOT:
    
        let SumaResta = state.cartNoRegister.map( cart => {if( cart && cart.products === action.payload.products && cart.size === action.payload.size){ return action.payload } else return cart});

        localStorage.setItem( "cartNoRegister", JSON.stringify( SumaResta ));

        return {
            ...state,
            cartNoRegister: SumaResta,
        }

    case PAYMENT_EFECT:
        
        return {
            ...state,
            paymentEfec: action.payload,
        }

    case PAYMENT_CARD:

        return {
            ...state,
            paymentCard: action.payload,
        }
        
    case GET_ORDER_CONFIRMED:

        return {
            ...state,
            orderConfirmed: action.payload,
        }
    case GET_ALL_ORDER_CONFIRMED:

        return {
            ...state,
            allOrderConfirmed: action.payload,
        }
     
    default:
        
        return {
            ...state
        }
    }
}
