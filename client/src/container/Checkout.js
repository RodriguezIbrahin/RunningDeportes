import React from 'react';
import { connect } from "react-redux";
import { Paper, Grid, Typography, Hidden} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Payment from "../component/payment/Payment"
import ModalBotton from "./ModalBotton";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
}));

function Checkout({cart}) {

    const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1}>
        
        <Hidden smDown >

            
            <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                
                <Paper className={classes.paper} style={{fontSize: '1.5rem',color: 'rgba(0, 0, 0, 0.54)',height: "8vh", width: "75vw"}} elevation={12}>
                    Medios de pagos
                </Paper>

            </Grid>


            <Grid item xs={6}>

                <ModalBotton props={<Payment cart={cart} payment={"efectivo"}/>} icon={
               
                   
                    <Paper className={classes.paper} style={{height: "69vh", width: "37.5vw", backgroundColor: "#3f51b5"}} elevation={24} >
                       
                        <Typography align="center" variant="overline" style={{fontSize: '1.5rem',color: '#ffffff'}} gutterBottom>
                           Efectivo <br/> Transferencia Bancaria
                        </Typography>

                        <Typography align="center" variant="subtitle2" style={{fontSize: '2.5rem',color: '#ffffff'}} gutterBottom>
                          <br/><i> 5% Descuento </i><br/>
                        </Typography>

                        <Typography align="left" variant="body2" style={{fontSize: '1.2rem',color: '#ffffff'}} gutterBottom>
                          <br/> <i>- Efectivo en punto de venta<br/> <br/>- Transferencia bancaria previa coordinación</i>
                        </Typography>
                 
                    </Paper>

                
                } style={{height: "75vh", width: "70vw" }} />

            </Grid>
            
            <Grid item xs={6}>
                
                <ModalBotton props={<Payment cart={cart} payment={"tarjeta"}/>} icon={
                    
                    <Paper className={classes.paper} style={{height: "69vh", width: "37.5vw",backgroundColor: "#f44336"}} elevation={24} >

                        <Typography align="center" variant="overline" style={{fontSize: '1.5rem',color: '#ffffff'}} gutterBottom>
                          Tarjeta <br/> Débito - Crédito <br/>
                        </Typography>

                        <Typography align="left" variant="body2" style={{fontSize: '1.2rem',color: '#ffffff'}} gutterBottom>
                          <br/><br/><i>- Todas las tarjetas <br/><br/>- Financiación segun promos bancarias</i>
                        </Typography>

                    </Paper>
                    
                } style={{height: "75vh", width: "70vw" }} />
        

            </Grid>

        </Hidden>

        <Hidden mdUp >

            <Grid item container direction="row" justify="center" alignItems="center" xs ={12}>
                
                <Paper className={classes.paper} style={{ fontSize: '1.5rem', color: 'rgba(0, 0, 0, 0.54)', height: "8vh", width: "67vw" }} elevation={12}>
            
                    Medios de pagos
    
                </Paper>

            </Grid>

            <Grid item xs={12}>
               
                <ModalBotton props={<Payment payment={"efectivo"}/>} icon={
                   
                    <Paper className={classes.paper} style={{ height: "32vh", width: "67vw", backgroundColor: "#3f51b5" }} elevation={24} >
                       
                        <Typography align="center" variant="overline" style={{fontSize: '0.8rem',color: '#ffffff'}} gutterBottom>
                          Efectivo<br/>Transferencia Bancaria
                        </Typography>

                        <Typography align="center" variant="subtitle2" style={{fontSize: '1rem',color: '#ffffff'}} gutterBottom>
                         5% Descuento
                        </Typography>

                        <Typography align="left" variant="body2" style={{fontSize: '0.6rem',color: '#ffffff'}} gutterBottom>
                          <i>-Efectivo en punto de venta <br/><br/>-Transferencia bancaria previa coordinación</i>
                        </Typography>
                        
                
                    </Paper>

                } style={{height: "75vh", width: "70vw" }} />

            </Grid>
            
            <Grid item xs={12}>

                
                <ModalBotton props={<Payment payment={"tarjeta"}/>} icon={
                    
                    <Paper className={classes.paper} style={{ height: "32vh", width: "67vw", backgroundColor: "#f44336" }} elevation={24} >

                        <Typography align="center" variant="overline" style={{fontSize: '0.9rem',color: '#ffffff'}} gutterBottom>
                           Tarjeta <br/> Débito - Crédito
                        </Typography>

                        <Typography align="left" variant="body2" style={{fontSize: '0.8rem',color: '#ffffff'}} gutterBottom>
                          <br/><i>- Todas las tarjetas <br/><br/>- Financiación segun promos bancarias</i>
                        </Typography>

                    </Paper>
                    
                } style={{height: "75vh", width: "70vw" }} />

        

            </Grid>

        </Hidden>

    </Grid>
  );
}

function mapStateToProps(state) {
    return {
       cart: state.cart,
    }
}
  
export default connect(mapStateToProps,null)(Checkout);
