import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { FormControlLabel, Checkbox, Grid, Box }from '@material-ui/core';
import { Account } from "../../Api";


function StepTwoCash({ cart, paymentEfec, SetPaymentEfect}) {

  const [state, setState] = React.useState({...paymentEfec, cash: true, uala: true });

  React.useEffect(() => {

    SetPaymentEfect({...paymentEfec, cash: true, uala: true })

  }, [])

  const handleState = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    SetPaymentEfect({ ...state, [event.target.name]: event.target.checked });
  };

  const handleStateTwo = (event) => {
    setState({ ...state, [event.target.name]: !event.target.checked });
    SetPaymentEfect({ ...state, [event.target.name]: !event.target.checked });
  };

  const handleValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    SetPaymentEfect({ ...state, [event.target.name]: event.target.checked });
  };

  const handleValueTwo = (event) => {
    setState({ ...state, [event.target.name]: !event.target.checked });
    SetPaymentEfect({ ...state, [event.target.name]: !event.target.checked });
  };

  return (
    
    <Grid container direction="row" justify="center" alignItems="center" xs={12} >
        
      <Box style={{ fontSize: '1.1rem', color: 'rgba(0, 0, 0, 0.54)',width: "50vw", padding:"0.5em"}}>

        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

          <Grid item container direction="row" justify="space-between" alignItems="center" xs={12} md={6}>
            
            <Grid item xs={1}>Total</Grid>
  
            <Grid item xs={3}>
              ${cart[0] && Math.floor(cart[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)*0.95)}
            </Grid>
              
            <Grid item xs={3}>
              <s style={{color: 'red'}}><i>${cart[0] && cart[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0)}</i></s>
            </Grid>
  
          </Grid>

        </Grid>

      </Box>

      <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12}>

        <Grid container direction="row" justify="flex-end" alignItems="center" xs={10} md={2}>
        
          <FormControlLabel
            control={
              <Checkbox 
                checked={state.cash} 
                onChange={handleState}
                color="primary"
                name="cash" 
              />
            }
            label="Efectivo"
            labelPlacement="start"
          />

        </Grid>

        <Grid container direction="row" justify="flex-end" alignItems="center" xs={10} md={3}>

          <FormControlLabel
            control={
              <Checkbox
                checked={!state.cash}
                onChange={handleStateTwo}
                name="cash"
                color="primary"
              />
            }
            label="Transferencia"
            labelPlacement="start"
          />

        </Grid>

      </Grid>

      {state.cash === true ?
        
        <Box style={{ fontSize: '1.1rem', color: 'rgba(0, 0, 0, 0.54)',height: "26vh",width: "60vw", padding:"0.5em"}}>

          <Grid item container direction="column" justify="center" alignItems="center" xs={12}> 

            En el punto de entrega seleccionado, confirmando mediante whatsapp

          </Grid>

        </Box> :

        <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12}> 

          <Grid container direction="row" justify="center" alignItems="center" xs={12} style={{ fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.54)',width: "60vw", padding:"0.5em"}}>
            <br/>Eliga una cuenta a depositar...
          </Grid>

          <Box style={{height: "10vh"}}/>

          <Grid container direction="row" justify="flex-end" alignItems="center" xs={10} md={2}>
          
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.uala}
                  onChange={handleValue}
                  name="uala"
                  color="primary"
                />
              }
              label="Uala"
              labelPlacement="start"
            />

          </Grid>
            
          <Grid container direction="row" justify="flex-end" alignItems="center" xs={10} md={3}>
  
            <FormControlLabel
              control={
                <Checkbox
                  checked={!state.uala}
                  onChange={handleValueTwo}
                  name="uala"
                  color="primary"
                />
              }
              label="Banco Provincia"
              labelPlacement="start"
            />

          </Grid>

          <Box style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.54)',width: "60vw", padding:"0.3em"}}>
            
            <Grid container direction="row" justify="center" alignItems="center" xs={12}> 
              <br/>Rodriguez Ibrahin
            </Grid>

            <Box style={{height: "3vh"}}/>

            <Grid container direction="row" justify="center" alignItems="center" xs={12} > 
              
              <Grid item container direction="row" justify="center" alignItems="center" xs={12} md={5}>
                CBU
              </Grid>

              <Grid item container direction="row" justify="center" alignItems="center" xs={12} md={5}>
                {state.uala ? Account[0].CBU : Account[1].CBU}
              </Grid>

              <Grid item container direction="row" justify="center" alignItems="center" xs={12} md={5}>
                Alias CBU
              </Grid>

              <Grid item container direction="row" justify="center" alignItems="center" xs={12} md={5}>
                {state.uala ? Account[0].AliasCBU : Account[1].AliasCBU}
              </Grid> 
              
            </Grid>

            <Box style={{height: "3vh"}}/>

            <Box style={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.74)',width: "60vw", padding:"0.3em"}}>

              <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                *Debera enviar una foto/foto captura del comprobante via whatsapp
              </Grid>  
              
            </Box>

            <Box style={{height: "3vh"}}/>

          </Box>
          

        </Grid>
      }

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

export default connect(mapStateToProps, mapDispatchToProps)(StepTwoCash);