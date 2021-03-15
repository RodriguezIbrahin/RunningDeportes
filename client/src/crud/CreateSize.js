import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { AlertError, AlertSucess } from "../component/Alerts";
import { URL } from "../Api";


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

export default function CreateSize() {

    const classes = useStyles();

    const [values, setValues] = React.useState({

       size: "",

    });

    const [error, setError] = React.useState(false);

    const [succes, setSucces] = React.useState(false);

    const handleChange = (prop) => (event) => {

       setValues({ ...values, [prop]: event.target.value });
      
    };

    const ClickCreate = (event) => {

        if(values.size) {
            
            let talle = {
                
                ar: values.size,

            };

            axios.post(`${URL}/sizes/`, talle,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

            .then(ress => {

                setSucces(true)
                setError(false)
            })

            .catch(err => {

                setError(true)
                setSucces(false)

            })

        }
        else
        setError(true)
        setSucces(false)
        
    };

    const ClickReset = (event) => {

        setValues({ ...values, size: "" });
        setError(false)
        setSucces(false)
    };


  return (

    <Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

        <Grid item xs={11} md={8}>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-size">Talle</InputLabel>

                <OutlinedInput
                   id="product-size"
                   value={values.size}
                   onChange={handleChange('size')}
                   labelWidth={35}
                />

            </FormControl>

        </Grid>

        <Grid item xs={12} md={9}>

            <AlertError props={error} onClick={setError}/>

        </Grid>

        <Grid item xs={12} md={9}>
            
            <AlertSucess props={succes} onClick={setSucces}/>

        </Grid>

        <Grid item container direction="row" justify="space-between" alignItems="center"  className={classes.root} xs={6}>
            
            <Grid item xs={1} >

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  onClick={ClickCreate}
                >
                    Crear

                </Button>

            </Grid>

            <Grid item xs={1} >

                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<ClearIcon />}
                  onClick={ClickReset}
                >
                    Reset

                </Button>

            </Grid>

        </Grid>

    </Grid>
  );
}