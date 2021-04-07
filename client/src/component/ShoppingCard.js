import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Paper, Typography, ButtonBase  } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  image: {
    width: 96,
    height: 96,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function ShoppingCard({ props, DeleteProductCart, UpDownProductCart, DeleteCartNoRegister, cartNoRegister, GetCartNoRegister, UpDownCartNoRegister }) {

  const classes = useStyles();

  const onclickDelete = () => {

    if( !localStorage.getItem('token') ){

      DeleteCartNoRegister({products: props.id, size: props.size});

      GetCartNoRegister(cartNoRegister.filter( cart => cart && cart.product !== props.id && cart.size !== props.size ));

    }

    else DeleteProductCart({products: props.id, size: props.size});

  };

  const onclickUp = () => {

    if( !localStorage.getItem('token') ){

        UpDownCartNoRegister({ products: props.id, size: props.size, quantity: props.quantity + 1 })

        GetCartNoRegister(cartNoRegister.map( cart => { if( cart && cart.products === props.id && cart.size === props.size){ return { products: props.id, size: props.size, quantity: props.quantity + 1 }} else return cart}))

    }
    
    else UpDownProductCart({ products: props.id, size: props.size, quantity: props.quantity + 1 })

  };

  const onclickDown = () => {

    if( !localStorage.getItem('token') ){

        if(props.quantity <= 1){

            DeleteCartNoRegister({products: props.id, size: props.size});

            GetCartNoRegister(cartNoRegister.filter( cart => cart.product !== props.id && cart.size !== props.size ));
        }
        else {
        
           UpDownCartNoRegister({ products: props.id, size: props.size, quantity: props.quantity - 1 })

           GetCartNoRegister(cartNoRegister.map( cart => {if(cart && cart.products === props.id && cart.size === props.size){ return { products: props.id, size: props.size, quantity: props.quantity - 1 }}else return cart}))
        }
    }

    else {

      if(props.quantity <= 1){ DeleteProductCart({products: props.id, size: props.size}) }

      else UpDownProductCart({ products: props.id, size: props.size, quantity: props.quantity - 1 })
    }

  };

  return (
    
    <div className={classes.root}>
      
      <Paper className={classes.paper} elevation={6}>

        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>

          <Grid item xs={5} sm={3}>

            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={props.id} src={props.images} />
            </ButtonBase>

          </Grid>

          <Grid item xs={4} sm={7}>

            <Typography variant='body1' >
              {props.name}
            </Typography>

            <Typography variant='body1' >
              Talle: {props.size}
            </Typography>

            <Typography variant='body1' >
              ${props.price} x {props.quantity} 
            </Typography>

          </Grid>

          <Grid item container direction="column" justify="space-between" alignItems="flex-end" xs={3} sm={2} >

            <Grid item>

              <IconButton onClick={onclickDelete}>
                <CancelOutlinedIcon/>
              </IconButton>

            </Grid>

            <Grid item>

              <IconButton onClick={onclickUp}>
                <ArrowDropUpOutlinedIcon/>
              </IconButton>

            </Grid>

            <Grid>

              <IconButton onClick={onclickDown}>
                <ArrowDropDownOutlinedIcon/>
              </IconButton>

            </Grid>

          </Grid>

        </Grid>

      </Paper>

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cartNoRegister: state.cartNoRegister,
  }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCard);