import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import {Button, Typography} from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { AlertError, AlertSucess } from "../Alerts";

function Psize({ id, props, UpDownProductCart, CartNoRegister}) {

    const [error, setError] = React.useState(false);

    const [succes, setSucces] = React.useState(false);

    const [size, setSize] = React.useState(null);

    const handleSize = (event, newSize) => {
       setSize(newSize);
    };

    const onClickADD = (event) => {

        if(!size){

           setSucces(false);
           setError(true);
        }
        else{

            if(!localStorage.getItem('token')){ 
                CartNoRegister({ products: id, size: size, quantity: 1 })
                setSucces(true);
                setError(false);
                setTimeout(function() {setSucces(false)}, 2500);
            }
            
            else{
                UpDownProductCart({ products: id, size: size, quantity: 1 });
                setSucces(true);
                setError(false);
                setTimeout(function() {setSucces(false)}, 2500);
            }
        } 
    };

    return (
        <Typography align="center" variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem'}} gutterBottom> 
           
            <br/><i>Talles</i><br/><br/>
            
            <ToggleButtonGroup value={size} exclusive onChange={handleSize} aria-label="size" > 

                {props && props.map( size => 

                    <ToggleButton value={size.ar} aria-label={size.ar}>
                        {size.ar}
                    </ToggleButton>
                )}
            </ToggleButtonGroup>

            <br/>
            <AlertError props={error} onClick={setError}/>
            <AlertSucess props={succes} onClick={setSucces}/>
            <br/>

            <Button fullWidth onClick={onClickADD} size="large" variant="contained" color="primary" endIcon={<AddShoppingCartOutlinedIcon/>}>
               Agregar Al Carrito
            </Button>

        </Typography>
    
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(Psize);