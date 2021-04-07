import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl, InputAdornment, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

}));


function StepTwoCard({paymentCard, SetPaymentCard }) {

  const classes = useStyles();

  let newState = paymentCard.card ? paymentCard : {...paymentCard, card: null, cardname: null };

  const [values, setValues] = React.useState(newState);

  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value })
       
    SetPaymentCard({ ...values, [prop]: event.target.value });
      
  };



  return (

    <Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

      <Grid item xs={11} md={8}>

        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                
          <TextField
            id="card-name"
            label="Mi nombre es"
            value={values.cardname}
            onChange={handleChange('cardname')}
            helperText="Ingrese el nombre, que figura en su tarjeta"
            required
          /> 

          <br/><br/>

          <TextField
            id="card-number"
            label="Mi tarjeta termina en "
            value={values.card}
            onChange={handleChange('card')}
            helperText="Ingrese los ultimos 4 digitos de su tarjeta"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">XXXX-XXXX-</InputAdornment>,
            }}
          /> 
        
        </FormControl>
        <br/><br/>
        <Typography align="center" variant="body2" style={{fontSize: '0.8rem'}} gutterBottom>
          Datos para control interno<br/><br/>
        </Typography>

      </Grid>
      
    </Grid>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    paymentCard: state.paymentCard,  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTwoCard);