import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button, Grid} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 400,
        flexGrow: 1,
    },

    img: {
        maxheight: 450,
        display: 'block',
        maxWidth: 450,
        overflow: 'hidden',
        width: '100%',
    },

}));

export default function Carrusel({img}) {

    const classes = useStyles();

    const theme = useTheme();

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const Steps = [ { label: img[0].label, imgPath: img[0].img }, { label: img[1].label, imgPath: img[1].img }, { label: img[2].label, imgPath: img[2].img } ];

    const [activeStep, setActiveStep] = React.useState(0);
    
    const maxSteps = Steps.length;

    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };

    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

    const handleStepChange = (step) => { setActiveStep(step); };

    return (

        <Grid className={classes.root}>
            
            <AutoPlaySwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={activeStep}
               onChangeIndex={handleStepChange}
               enableMouseEvents
            >

                {Steps.map((step, index) => (

                    <div key={step.label}>

                       {Math.abs(activeStep - index) <= 2 ? ( <img className={classes.img} src={step.imgPath} alt={step.label} /> ) : null}

                    </div>
                    
                ))}

            </AutoPlaySwipeableViews>
            
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={

                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                       Next {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>

                }
                backButton={ 
                   
                   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                       {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} Back
                   </Button>

                }

            />

        </Grid>

    );

}
