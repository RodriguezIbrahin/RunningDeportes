import React from "react";
import Lottie from "react-lottie";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { Grid, Container } from '@material-ui/core';
import ProductCard from "../component/ProductCard";
import Product from "../component/products/Product";
import shoes from "../animations/shoes.json";

const defaultOptions = {

    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    },
    animationData: shoes
}

class Catalogo extends React.Component {

    componentDidMount(){
        this.props.GetAllProducts()
    }
    
    render(){

        return(

            <Container>

                <Grid container direction="row" justify="space-around" alignItems="center" spacing={6}>

                  { this.props.id > 0 ? <Product/> : this.props.products.length === 0 ? <Grid item> <Lottie options={defaultOptions} width={300} height={300} /> </Grid> 
                  
                  : this.props.products.map( product => <Grid item> <ProductCard props={product}/> </Grid>)}

                </Grid>

            </Container>
        
        )
    }
}; 
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        products: state.products,
        id: state.id,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
