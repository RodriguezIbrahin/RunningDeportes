import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { Grid, Paper, Box } from '@material-ui/core';
import { Account } from "../../Api";


function StepTreeCash({paymentEfec, cart}) {


  return (

    <Grid container direction="row" justify="center" alignItems="center" xs={12} >

        <Grid item xs={12}>
            
            <Box style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}}>
                
                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                  <br/>Medio de pago: {paymentEfec.cash ? "Efectivo" : "Transferencia Bancaria"}

                </Grid>

                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                  <br/> {`Retira ${paymentEfec.person} el ${paymentEfec.date} por ${paymentEfec.point}.`}

                  <br/><br/>{paymentEfec.cash ? "Abonando al retirar." :
                  !paymentEfec.cash && paymentEfec.uala ? "Abonando a la cuenta Uala" :
                  !paymentEfec.cash && !paymentEfec.uala ? "Abonando a la cuenta del Banco Provincia" : "nada"}<br/><br/>

                  { !paymentEfec.cash && paymentEfec.uala ? "CBU: " + Account[0].CBU : !paymentEfec.cash && !paymentEfec.uala ? "CBU: " + Account[1].CBU : ""}
                  <br/><br/>
                  { !paymentEfec.cash && paymentEfec.uala ? "Alias CBU: " + Account[0].AliasCBU : !paymentEfec.cash && !paymentEfec.uala ? "Alias CBU: " + Account[1].AliasCBU : ""}
                  <br/>
                </Grid>

            </Box>

        </Grid>

        <Grid item xs={12}>
            
            {cart[0] && cart[0].products.map((product) => 
                
                        
                <Grid item container direction="row" justify="center" alignItems="center" xs={12} style={{padding: 3}}>
                    
                    <Paper style={{fontSize: '1rem',color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}} elevation={6}>
                        
                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}> {product.name} </Grid>

                        <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12}>

                            <Grid item container direction="row" justify="center" alignItems="center" xs={4}> 
                               <img style={{width: 72, height: 72}} alt={product.id} src={product.images} />
                            </Grid>
            
                            <Grid item container direction="row" justify="center" alignItems="center" xs={3}>

                                <Grid item container direction="row" justify="center" alignItems="center" xs={12} md= {6}>
                                 Talle:
                                </Grid>
                                 
                                <Grid item container direction="row" justify="center" alignItems="center" xs={12} md= {6}>
                                  {product.size}
                                </Grid>

                            </Grid>

                            <Grid item container direction="row" justify="center" alignItems="center" xs={2}> X {product.quantity} </Grid>

                            <Grid item container direction="row" justify="center" alignItems="center" xs={3}> $ {product.price} </Grid>
                    
                        </Grid>
        
                    </Paper>


                </Grid>

            )}

            <Grid item container direction="row" justify="center" alignItems="center" xs={12} style={{padding: 3}}>
                    
                <Paper style={{fontSize: '1rem',color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}} elevation={6}>
                        
                    <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                        Total  ${cart[0] && Math.floor(cart[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)*0.95)}.- 
                        
                    </Grid>
        
                </Paper>


            </Grid>

        </Grid>

        <Grid item xs={12}>
            
            <Box style={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.74)', width: "60vw", padding:"0.5em"}}>
                
                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                  <br/> *Debe comunicarse al whatsapp (+54)11 6206-7821

                </Grid>

            </Box>

        </Grid>

    </Grid>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    paymentEfec: state.paymentEfec,
    cart: state.cart 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTreeCash);