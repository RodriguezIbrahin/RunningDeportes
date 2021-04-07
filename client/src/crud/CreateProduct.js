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

export default function CreateProduct () {

    const classes = useStyles();

    const [values, setValues] = React.useState({

       name: "",
       price: "",
       pricelister: "",
       description: "",
       marca: "",
       sizes:  "",
       stock: "",
       images1: "",
       images2: "",
       images3: "",

    });

    const [error, setError] = React.useState(false);

    const [succes, setSucces] = React.useState(false);

    const handleChange = (prop) => (event) => {

       setValues({ ...values, [prop]: event.target.value });
      
    };

    const ClickCreate = (event) => {

        if(values.stock && values.name && values.price && values.pricelister && values.description && values.marca && values.sizes && values.images1 && values.images2 && values.images3 ) {
            
            let stock2= values.stock.split(","); 

            let stock = values.sizes.split(",").map((size, index) => [ parseInt(size), parseInt( stock2[index]) ]);
            
            let products = {
                
                name: values.name,
                price: values.price,
                pricelister: values.pricelister,
                description: values.description,
                marca: values.marca,
                sizes: stock,
                images: [values.images1,values.images2,values.images3],

            };

            axios.post(`${URL}/products/`, products,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

            .then(ress => {

                setSucces(true)
                setError(false)
                setValues({ ...values, id: "", name: "", price: "", pricelister: "", description: "", marca: "", sizes: "", stock: "",images1: "", images2: "", images3: "" });
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

        setValues({ ...values, name: "", price: "", pricelister: "", description: "", marca: "", sizes: "", stock: "", images1: "", images2: "", images3: "" });
        setError(false)
        setSucces(false)
    };


  return (

    <Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

        <Grid item xs={11} md={8}>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-name">Name</InputLabel>

                <OutlinedInput
                   id="product-name"
                   value={values.name}
                   onChange={handleChange('name')}
                   labelWidth={45}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-price">Precio</InputLabel>

                <OutlinedInput
                   id="product-price"
                   value={values.price}
                   onChange={handleChange('price')}
                   labelWidth={50}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-pricelister">Precio de Lista</InputLabel>

                <OutlinedInput

                   id="product-pricelister"
                   value={values.pricelister}
                   onChange={handleChange('pricelister')}
                   labelWidth={110}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                
                <InputLabel htmlFor="product-description">Descripción</InputLabel>

                <OutlinedInput
                   id="product-description"
                   value={values.description}
                   onChange={handleChange('description')}
                   labelWidth={85}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-marca">Marca</InputLabel>

                <OutlinedInput
                   id="product-marca"
                   value={values.marca}
                   onChange={handleChange('marca')}
                   labelWidth={45}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-sizes">Talles</InputLabel>

                <OutlinedInput
                   id="product-sizes"
                   value={values.sizes}
                   onChange={handleChange('sizes')}
                   labelWidth={45}
                />

            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-stock">Stock</InputLabel>

                <OutlinedInput
                   id="product-stock"
                   value={values.stock}
                   onChange={handleChange('stock')}
                   labelWidth={45}
                />

            </FormControl>

            <FormControl className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-images1">Imagen Nº1</InputLabel>

                <OutlinedInput
                   id="product-images1"
                   value={values.images1}
                   onChange={handleChange('images1')}
                   labelWidth={85}
                />

            </FormControl>

            <FormControl className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-images2">Imagen Nº2</InputLabel>

                <OutlinedInput
                   id="product-images2"
                   value={values.images2}
                   onChange={handleChange('images2')}
                   labelWidth={85}
                />

            </FormControl>

            <FormControl className={clsx(classes.margin)} variant="outlined">

                <InputLabel htmlFor="product-images3">Imagen Nº3</InputLabel>

                <OutlinedInput
                   id="product-images3"
                   value={values.images3}
                   onChange={handleChange('images3')}
                   labelWidth={85}
                />

            </FormControl>

        </Grid>

        <Grid item xs={12} md={9}>

            <AlertError props={error} onClick={setError}/>

        </Grid>

        <Grid item xs={12} md={9}>
            
            <AlertSucess props={succes} onClick={setSucces}/>

        </Grid>

        <Grid item container direction="row" justify="space-between" alignItems="center"  className={classes.root} xs={12}>
            
            <Grid item container direction="row" justify="center" alignItems="center" xs={6} >

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

            <Grid item container direction="row" justify="center" alignItems="center" xs={6} >

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