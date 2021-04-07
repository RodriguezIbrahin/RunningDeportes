import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { Grid, Button, Box, Typography, Paper, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCard from "../component/ShoppingCard";
import ModalBotton from "./ModalBotton";
import Checkout from "./Checkout";
import Sign from "./Sign";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
}));

function ShoppingCart({ cart, GetCart, cartNoRegister, GetCartNoRegister, getCartNoRegister}) {

    const classes = useStyles();

    React.useEffect(() => {

        if(!localStorage.getItem('token')){ GetCartNoRegister(cartNoRegister)}
        
        else GetCart();

    }, [])


  return (
    <div>
      
        <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            href="https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0" target="_blank"
        >
                                
            Consultanos

        </Button>

        <Box css={{ height: "2vh" }}/>


        <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={2}>

            <Grid item container xs={12} md={8} lg={9} spacing={1}>

            {!localStorage.getItem('token') ? getCartNoRegister[0] && getCartNoRegister[0].products.map((product) => <Grid item xs={12}> <ShoppingCard props={product} /> </Grid>)
            : cart[0] && cart[0].products.map((product) => <Grid item xs={12}> <ShoppingCard props={product} /> </Grid>)}
                
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center" xs={12} md={4} lg={3}>

                <Grid xs={12}> 

                    <Paper className={classes.paper} elevation={12}>

                        <Grid container direction="row" justify="space-around" alignItems="center" xs={12}>

                            <Grid item xs={4}>

                                <Typography align='left' variant='h6' >
                                   Total
                                </Typography>

                            </Grid>

                            <Grid item xs={4}>

                                <Typography align='right' variant='subtitle1' >

                                   ${ !localStorage.getItem('token') ? getCartNoRegister[0] && getCartNoRegister[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0):

                                    cart[0] && cart[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)}.-
                               
                                </Typography>

                            </Grid>

                            <Grid item xs={12}>

                                <Box css={{ height: "2vh" }}/>
                                <Divider/>
                                <Box css={{ height: "2vh" }}/>

                            </Grid>

                            <Grid item xs={12}>
                               
                                { 
                                    getCartNoRegister.length && !getCartNoRegister[0].products.length && !localStorage.getItem('token') ? <Button fullWidth variant="contained" color="secondary" disabled={true}> COMPRAR </Button> :
                                  
                                    !localStorage.getItem('token') ? <ModalBotton props={<Sign/>} icon={"COMPRAR "} style={{height: "85vh", width: "80vw" }} color={"secondary"} variant={"contained"} disabled={false}/> :

                                    localStorage.getItem('token') && cart.length && !cart[0].products.length ? <ModalBotton props={<Sign/>} icon={"COMPRAR "} style={{height: "85vh", width: "80vw" }} color={"secondary"} variant={"contained"} disabled={true}/> :

                                    <ModalBotton props={<Checkout/>} icon={"COMPRAR"} style={{height: "85vh", width: "80vw" }} color={"secondary"} variant={"contained"} disabled={false}/> 
                                }

                            </Grid>
                            

                        </Grid>

                    </Paper>

                </Grid>

            </Grid>

        </Grid> 

    </div>
  );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
  
function mapStateToProps(state) {
    return {
       cart: state.cart,
       getCartNoRegister: state.getCartNoRegister,
       cartNoRegister: state.cartNoRegister,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
  