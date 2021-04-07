import React from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { Stepper, Step, StepLabel, Button, Grid, Box } from '@material-ui/core';
import { AlertError } from "../Alerts";
import StepOne from "./StepOne";
import StepTwoCard from "./StepTwoCard";
import StepTreeCard from "./StepTreeCard";
import StepTwoCash from "./StepTwoCash";
import StepTreeCash from "./StepTreeCash";
import StepFourCash from "./StepFourCash";
import StepFourCard from "./StepFourCard";
import { URL, Uala } from "../../Api";

function getSteps() {
    return ['Retiro', 'Pago', "Check"];
}

function getStepContent(stepIndex, payment) {

    if(payment === "efectivo"){

        switch (stepIndex) {
            case 0:
              return <StepOne payment={"efectivo"}/>;
            case 1:
              return <StepTwoCash/>;
            case 2:
              return <StepTreeCash/>;
            default:
              return 'Unknown stepIndex';
        }
    }
    if(payment === "tarjeta"){

        switch (stepIndex) {
            case 0:
              return <StepOne payment={"tarjeta"}/>;
            case 1:
              return <StepTwoCard/>;
            case 2:
              return <StepTreeCard/>;
            default:
              return 'Unknown stepIndex';
        }
    }
}

function Payment({ payment, paymentCard, paymentEfec, cart }) {

    const Total = cart[0].products.reduce(function(Total, product){ return Total +( product.price * product.quantity) },0);
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = React.useState(false);
    
    const steps = getSteps();

    const handleNext = () => {
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
       setActiveStep((prevActiveStep) => prevActiveStep - 1);
       setError(false)
    };
    
    const Pago = { type: null, phone: null, point: null, day: null, name: null, bank: null, card_name: null, card_number: null }

    const handleFinish = () => {

        if(payment === "efectivo"){

            if(paymentEfec.cash){

                let newPago = {...Pago, type: "cash", phone: paymentEfec.phone, point: paymentEfec.point, day: paymentEfec.date, name: paymentEfec.person }

                if( newPago.phone && newPago.point, newPago.day && newPago.name ){

                    axios.post( `${URL}/quantity/`, newPago , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    
                    .then(ress => { setActiveStep((prevActiveStep) => prevActiveStep + 1); 
                        setTimeout(function() { window.location.href = "" }, 9500);
                    })
        
                    .catch(err => setError(true) );
                }
                else setError(true)
            }
            if(!paymentEfec.cash && paymentEfec.uala){

                let newPago = {...Pago, type: "trans", phone: paymentEfec.phone, point: paymentEfec.point, day: paymentEfec.date, name: paymentEfec.person, bank: "Uala"} 

                if( newPago.phone && newPago.point, newPago.day && newPago.name ){

                    axios.post( `${URL}/quantity/`, newPago, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

                    .then(ress => { setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        setTimeout(function() { window.location.href = "" }, 9500);
                    })
        
                    .catch(err => setError(true));
                }
                else setError(true)

            }
            if(!paymentEfec.cash && !paymentEfec.uala){

                let newPago = {...Pago, type: "trans", phone: paymentEfec.phone, point: paymentEfec.point, day: paymentEfec.date, name: paymentEfec.person, bank: "BancoProvincia" } 

                if( newPago.phone && newPago.point, newPago.day && newPago.name ) {

                    axios.post( `${URL}/quantity/`, newPago , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

                    .then(ress => { setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        setTimeout(function() { 
                            window.location.href = "" 
                        }, 9500);
                    })
        
                    .catch(err => setError(true));
                }
                else setError(true)
            }

        }
        if(payment === "tarjeta"){

            let newPago = {...Pago, type: "card", phone: paymentCard.phone, point: paymentCard.point, day: paymentCard.date, name: paymentCard.person, card_name: paymentCard.cardname, card_number: paymentCard.card };

            if( newPago.phone && newPago.point, newPago.day && newPago.name && newPago.card_name && newPago.card_number ){

                axios.post( `${URL}/quantity/`, newPago , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })

                .then(ress => { 
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                   
                    const link = Uala.filter(link => Total === link[0])

                    link.length ? setTimeout(function() { window.location.href = link[0][1] }, 9500) :
    
                    setTimeout(function() { window.location.href = "https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0" }, 11000);
                    
                })
    
                .catch(err => setError(true));

            }
            else setError(true)

        }

    };

    return (

        <Grid container direction="row" justify="center" alignItems="center" >
           
            <Grid item xs={12}>

                <Stepper activeStep={activeStep} alternativeLabel>

                    { steps.map((label) => ( <Step key={label}> <StepLabel>{ label }</StepLabel> </Step> )) }

                </Stepper>
                
            </Grid>

            <Grid item xs={12}>

                { activeStep === steps.length && payment === "efectivo" ? <StepFourCash/> :

                  activeStep === steps.length && payment === "tarjeta" ? <StepFourCard/> :

                    <Grid container direction="row" justify="center" alignItems="center">

                        <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                            <Box style={{width: "63vw"}}>

                              {getStepContent(activeStep, payment)}

                            </Box>

                        </Grid>

                        <Grid item container direction="row" justify="space-around" alignItems="flex-end" xs ={12}>
                            
                            <Grid item xs={12}>

                                <AlertError props={error} onClick={setError}/>

                            </Grid>
                           
                            <Grid item container direction="row" justify="center" alignItems="center" xs={6} sm={2}> 

                                <Button disabled={activeStep === 0} variant="contained" color="secondary" onClick={handleBack} >
                                    Atras
                                </Button>

                            </Grid>

                            <Grid item container direction="row" justify="center" alignItems="center" xs={6} sm={2}>

                                {activeStep === steps.length - 1 && payment === "efectivo" ?

                                    <Button variant="contained" color="primary"  onClick={handleFinish} >
                                       Finalizar
                                    </Button> :

                                    activeStep === steps.length - 1 && payment === "tarjeta" ?

                                    <Button variant="contained" color="primary"  onClick={handleFinish} >
                                       Finalizar
                                    </Button> :

                                   <Button variant="contained" color="primary" onClick={handleNext}>
                                        Siguiente
                                   </Button>
                                }

                            </Grid>

                        </Grid>

                    </Grid>
                
                }

            </Grid>
            
        </Grid>

    );
}

function mapStateToProps(state) {
    return {
        paymentCard: state.paymentCard, 
        paymentEfec: state.paymentEfec,
        cart: state.cart
    }
}
  
export default connect( mapStateToProps, null )(Payment);
