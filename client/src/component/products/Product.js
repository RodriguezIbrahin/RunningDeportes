import React from "react";
import Lottie from "react-lottie";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { Grid, Typography, Paper } from '@material-ui/core';
import shoes from "../../animations/shoes.json";
import Psizes from "./Psize";
import Carrusel from "./Carrusel";

const defaultOptions = {

    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    },
    animationData: shoes
}



export class Product extends React.Component {

    componentDidMount(){

       this.props.GetProduct(this.props.id)

    }
    
    render(){

        return(
        <Paper elevation={3} style={{padding:"0.3em", marginTop: "2em", marginBottom: "2em", minWidth: "60vw"}}>
           
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                

                {!this.props.product.images ? <Grid item> <Lottie options={defaultOptions} width={300} height={300} /> </Grid> :
                
                <Grid item container direction="row" justify="space-evenly" alignItems="center">
                    
                    <Grid item container direction="row" justify="center" alignItems="center" xs={12} md={6}>
                            
                        <Carrusel img={this.props.product.images.map(image => ({ img: image.img, label: image.productId }))}/>
                
                    </Grid>

                    <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={11} md={6}>
                        
                        <Grid item xs={12}>

                            <Typography align="center" variant="h2" style={{fontFamily: 'Nunito', fontWeight: 'bold',fontSize: '1.6rem',color: 'blue'}} gutterBottom>
                               
                               <br/>{this.props.product.name}

                            </Typography>

                            <Typography variant="body2" style={{fontSize: '0.8rem'}} gutterBottom>

                               <br/>Item Nº {this.props.product.id}

                            </Typography> 

                            <Typography align="center" variant="h2" style={{fontFamily: 'Nunito', fontWeight: 'bold',fontSize: '2rem'}}>
                                
                                <pre><i>$ {this.props.product.price}.-  <s style={{color: 'gray',}}>$ {this.props.product.pricelister}.-</s></i></pre>

                            </Typography>

                            <Typography  color="error" variant="body2" style={{fontSize: '0.9rem'}} gutterBottom>

                                Ahorro de $ {this.props.product.pricelister - this.props.product.price }  ({Math.ceil(100 - (this.props.product.price * 100 / this.props.product.pricelister))}%)

                            </Typography>

                            <Typography align="center" variant="body1" style={{fontSize: '1.2rem'}} gutterBottom>

                                <br/><i>{this.props.product.description}.</i>

                            </Typography>
                            
                            <Typography align='center' variant="body1" style={{fontFamily: 'Nunito', fontWeight: 'bold', fontSize: '1rem'}} gutterBottom>

                                <br/>Marca: {this.props.product.marca} <br/>

                            </Typography>

                            <Psizes props={this.props.product.sizes} id={this.props.product.id}/>
                            <br/>
                        </Grid>
                
                    </Grid>

                </Grid> }

            </Grid>

        </Paper>
        )
    }
}; 
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        product: state.product,
        id: state.id,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Product);