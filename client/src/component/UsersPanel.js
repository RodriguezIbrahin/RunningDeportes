import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { Grid, Divider, Paper, Box } from '@material-ui/core';
import {  Account } from "../Api";
import travel from "../animations/travel.png";


function UserPanel({orderConfirmed, GetOrdenConfirmed}) {

    const [Hover, setHover] = React.useState({ hover: false, order: null });
    
    React.useEffect(() => {

        GetOrdenConfirmed()
        
    },[])

    const handleMauseOn  = (prop) => (event)  => {
       setHover({hover: true, order: prop })
    };
    
    const handleMauseOff  = (prop) => (event)  => {
        setHover({hover: false, order: null })
    };
     
  
    return (
        
        <Grid container direction="row" justify="space-around" alignItems="center" xs={12} >
            
            <Grid item container direction="row" justify="flex-start" alignItems="center" xs={3} sm={2} md={1}>
                <img width="100%" src={travel}/>
            </Grid>

            <Grid item container direction="row" justify="center" alignItems="center" style={{ fontSize: '1.5rem', color: 'rgba(0, 0, 0, 0.54)', padding:"0.5em"}} xs={8} md={6}>
 
                {localStorage.getItem('fullname')}
                
            </Grid>

            <Grid item xs={10}>
               <Divider/>
            </Grid>

            { orderConfirmed.length && orderConfirmed.map( order =>

                <Grid item container direction="row" justify="center" alignItems="center" onMouseEnter={handleMauseOn(order.order)} onMouseLeave={handleMauseOff(order.order)} xs={12} >

                    <Grid item  container direction="row" justify="center" alignItems="center" xs={12}>
                        
                        <Grid item container direction="row" justify="space-evenly" alignItems="center" style={{ fontSize: '1.1rem', color: 'rgba(0, 0, 0, 0.84)', padding:"0.5em"}} xs={9}>

                            
                            <Grid item container direction="row" justify="center" alignItems="center" xs={2}>
                                Order:
                            </Grid>

                            <Grid item container direction="row" justify="center" alignItems="center" xs={2}>
                                {order.order}
                            </Grid>
                                    

                        </Grid>

                        {Hover.hover && Hover.order === order.order ?
                        
                            <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                                {order.payment.type === "cash" || order.payment.type === "trans" ? 
                                            
                                    <Box style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}}>
                
                                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                            
                                            <br/>Medio de pago: {order.payment.type === "cash" ? "Efectivo" : "Transferencia Bancaria"}
                            
                                        </Grid>
                            
                                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                        
                                            <br/> {`Retira ${order.payment.name} el ${order.payment.day} por ${order.payment.point}.`}
                            
                                            <br/><br/>{order.payment.type === "cash" ? "Abonando al retirar." :
                                            "Abonando a la cuenta " + order.payment.bank}<br/><br/>
                            
                                            { 
                                               order.payment.type === "trans"  && order.payment.bank === "Uala" ? "CBU: " + Account[0].CBU :
                                               order.payment.type === "trans" && order.payment.bank !== "Uala" ? "CBU: " + Account[1].CBU : ""
                                            }
                                            <br/>
                                            { 
                                               order.payment.type === "trans"  && order.payment.bank === "Uala" ? "Alias CBU: " + Account[0].AliasCBU :
                                               order.payment.type === "trans" && order.payment.bank !== "Uala" ? "Alias CBU: " + Account[1].AliasCBU: ""
                                            }
                                            
                                        </Grid>
                            
                                    </Box>

                                    : <Box style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}}>
                
                                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                    
                                           <br/> {`Medio de pago: Tarjeta`}
                    
                                        </Grid>
                    
                                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                    
                                            <br/> {`Retira ${order.payment.name} el ${order.payment.day} por ${order.payment.point}.`}
                    
                                            <br/><br/>{`Se abona con la tarjeta XXXX-XXXX-${order.payment.card_number} a nombre de ${order.payment.card_name}.`}<br/><br/>
                    
                                        </Grid>
                    
                                    </Box>
                                
                                }

                            </Grid>:  <Grid/> 
                        }
                            

                        {order.products.length && order.products.map( product =>
                        
                            <Grid xs={12} md={4} >
                                    
                                <Paper style={{fontSize: '1rem',color: 'rgba(0, 0, 0, 0.54)', padding:"0.5em", margin: "0.5em"}} elevation={6}>
                                
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
                          
                                    Total ${ order.products.length && order.payment && order.payment.type === "card" ? Math.floor( order.products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)) +".-" :
                                    Math.floor( order.products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)*0.95) + ".- 5% OFF"}
                            
                                </Grid>
            
                            </Paper>
    
                        </Grid>

                        <Grid item xs={8}>

                            <br/>
                            <Divider/>

                        </Grid>

                    </Grid>
                       

                </Grid>

            )}

        </Grid>
    
    );
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }
  
  function mapStateToProps(state) {
    return {
        orderConfirmed: state.orderConfirmed
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);