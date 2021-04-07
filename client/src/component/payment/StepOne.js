import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { POINTS } from "../../Api";


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


function StepOne({paymentCard, paymentEfec, SetPaymentCard, SetPaymentEfect, payment }) {

  const classes = useStyles();

  let newState= payment === "tarjeta" && paymentCard ? paymentCard : payment === "efectivo" && paymentEfec ? paymentEfec : { point: null, date: null, person: null, phone: null}

  const [values, setValues] = React.useState(newState);

  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value })

    if( payment === "tarjeta" ){ SetPaymentCard({ ...values, [prop]: event.target.value });}

    if( payment === "efectivo" ){ SetPaymentEfect({ ...values, [prop]: event.target.value });}
      
  };

  function dateIn(weekday){

    let date = new Date();

    let days = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let month = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    if( weekday === date.getDay() ){ date.setDate(date.getDate() + 7 )}

    if( weekday === 0 && weekday !== date.getDay() ){ date.setDate( date.getDate() + 7 - date.getDay() )}

    if( weekday < date.getDay() ){ date.setDate( date.getDate() + weekday + 7 - date.getDay() )}

    else { date.setDate( date.getDate() + weekday - date.getDay() )}

    return `${days[date.getDay()]}, ${date.getDate()} de ${month[date.getMonth()]}`
  }


  return (

    <Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

      <Grid item xs={11} md={8}>

        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                
          <TextField
            id="select-deliveries"
            select
            label="Retiro en"
            value={values.point}
            onChange={handleChange('point')}
            helperText="Seleccione su punto de retiro"
            required
          > 
            {POINTS.map((point) => ( 
              <MenuItem key={point.Point} value={point.Point}>
                {point.Point}
              </MenuItem>
            ))}

          </TextField>

          <br/>

          <TextField
            id="select-date"
            select
            label="El dia"
            value={values.date}
            onChange={handleChange('date')}
            helperText="Seleccione dia y hora"
            required
          > 
            {values.point && POINTS.filter(point => point.Point === values.point )[0].Date.map((date) => 
                    
              <MenuItem key={date.id} value={`${dateIn(date.id)} a ${date.hour}`}>
                {`${dateIn(date.id)} a las ${date.hour}`}
              </MenuItem>
            )}

          </TextField>

          <br/>

          <TextField
            id="person"
            label="A nombre de"
            value={values.person}
            onChange={handleChange('person')}
            helperText="Nombre de la persona que retira"
            required
          /> 

           <br/>

          <TextField
            id="phone"
            label="Mi telefono es"
            value={values.phone}
            onChange={handleChange('phone')}
            helperText="Ingrese un numero de telefono"
            required
          />
            

        </FormControl>
        <br/><br/>
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
    paymentEfec: state.paymentEfec,   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);