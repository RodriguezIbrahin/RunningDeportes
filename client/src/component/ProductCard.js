import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography }from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function ProductCard(props) {
  const classes = useStyles();

  const handleClick = (event) => {
    props.GetIdProduct(props.props.id)
  };



  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={props.props.images[2].img}
          title={props.props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2" align="center" >
           {props.props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <lu>
                <li>  Precio: ${props.props.price}</li>
                <li>  Marca: {props.props.marca} </li> 
              </lu>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item>
        
                <Button size="small" color="primary" onClick={handleClick}>
                  Learn More
                </Button>
  
          </Grid>
          <Grid item>
            <Button size="small" style={{color: "#43a047"}} href="https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0" target="_blank">
             <WhatsAppIcon/>
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(null, mapDispatchToProps)(ProductCard);