import React from "react";
import Lottie from "react-lottie";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import { Grid, Typography, Paper} from '@material-ui/core';
import shoes from "../animations/shoes.json";

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
        <Paper elevation={3} style={{padding:"1em"}} >
           
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                

                {!this.props.product.images ? <Grid item> <Lottie options={defaultOptions} width={300} height={300} /> </Grid> :
                
                <Grid item container direction="row" justify="space-evenly" alignItems="center">
                    
                    <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12} md={5} lg={4}>
                        
                        <Grid item>

                            <img  src={this.props.product.images[1].img} alt="nada" width="100%"
                            style={{border: "2px solid", color: "blue"}}/>
                            
                        </Grid>
                
                    </Grid>

                    <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12} md={5} lg={4}>
                        
                        <Grid item>
                            
                            <img  src={this.props.product.images[2].img} alt="nada" width="100%"
                            style={{border: "2px solid", color: "blue"}}
                            />
              
                        </Grid>
                
                    </Grid>

                    <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12} md={8}>
                        
                        <Grid item xs={12}>

                            <Typography align="center" variant="h2" style={{fontFamily: 'Nunito', fontWeight: 'bold',fontSize: '2.5rem',color: 'blue'}} gutterBottom>
                               
                               <br/>{this.props.product.name}

                            </Typography>

                            <Typography variant="body2" style={{fontSize: '1rem'}} gutterBottom>

                                Item Nº {this.props.product.id}

                            </Typography> 

                            <Typography variant="h2" style={{fontFamily: 'Nunito', fontWeight: 'bold',fontSize: '3rem'}}>
                                
                                <pre><i>${this.props.product.price}.-  <s style={{color: 'gray',}}>${this.props.product.pricelister}.-</s></i></pre>

                            </Typography>

                            <Typography  color="error" variant="body2" style={{fontSize: '1rem'}} gutterBottom>

                                Ahorro de $ {this.props.product.pricelister - this.props.product.price }  ({Math.ceil(100 - (this.props.product.price * 100 / this.props.product.pricelister))}%)

                            </Typography>

                            <Typography align="center" variant="body1" style={{fontSize: '1.5rem'}} gutterBottom>

                                <br/><i>{this.props.product.description}.</i>

                            </Typography>
                            
                            <Typography variant="body1" style={{fontFamily: 'Nunito', fontWeight: 'bold', fontSize: '1.5rem'}} gutterBottom>

                                <br/>Marca: {this.props.product.marca} <br/>

                            </Typography>

                            <Typography align="center" variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem'}} gutterBottom>

                                <br/><i>Talles</i><br/> {this.props.product.sizes.map( size => <i> {size.ar} </i>)} <br/>

                            </Typography>
              
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



{/* <Grid item container direction="row" justify="space-evenly" alignItems="center" xs={12}>

<Button size="large" style={{color: "#43a047", height: "180"}} href="https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0" target="_blank">
   <WhatsAppIcon/>
</Button>

<Button size="small" color="primary" href="https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0" target="_blank">
  
   <FacebookIcon/>

</Button>

</Grid> */}