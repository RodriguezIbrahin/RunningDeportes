import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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

export default function DeleteProduct () {

    const classes = useStyles();

    const [values, setValues] = React.useState({

       id: "",
       name: "",

    });

    const [error, setError] = React.useState(false);

    const [succes, setSucces] = React.useState(false);

    const handleIdChange = (prop) => (event) => {

        setValues({ ...values, name: "", [prop]: event.target.value });

        axios.get(`${URL}/products/${event.target.value}`)

        .then(ress => {
           
            setValues({ ...values, id: ress.data.id, name: ress.data.name})    
          
        })
        .catch(err => {

            setError(true);
            setSucces(false);
        })
       
    };

    const handleChange = (prop) => (event) => {

       setValues({ ...values, [prop]: event.target.value });

      
    };

    const ClickDelete = (event) => {

        if(values.id && values.name) {
            

            axios.delete(`${URL}/products/${values.id}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

            .then(ress => {

                setSucces(true);
                setError(false);
                setValues({ ...values, id: "", name: ""});
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

        setValues({ ...values, id: "", name: ""});
        setError(false)
        setSucces(false)
    };


  return (

    <Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

        <Grid item xs={10} md={6}>
            
            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-id">Producto Nº</InputLabel>

                <OutlinedInput
                   id="product-id"
                   value={values.id}
                   onChange={handleIdChange('id')}
                   labelWidth={90}
                />

            </FormControl>

        </Grid>

        <Grid item xs={11} md={8}>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-name">Name</InputLabel>

                <OutlinedInput
                   id="product-name"
                   value={values.name}
                   onChange={handleChange('name')}
                   labelWidth={45}
                   disabled
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
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={ClickDelete}
                >
                    Borrar

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