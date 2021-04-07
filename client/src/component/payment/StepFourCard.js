import React from 'react';
import { Grid, Box, LinearProgress } from '@material-ui/core';


export default function StepFourCard() {

    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
  
    const progressRef = React.useRef(() => {});

    React.useEffect(() => {

        progressRef.current = () => {


            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
           
        };
    });

    React.useEffect(() => {

        const timer = setInterval(() => {
            progressRef.current();
        }, 500);
    
        return () => {
            clearInterval(timer);
        };

    }, []);
  
    return (
       
        <Box style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.54)', width: "60vw", padding:"0.5em"}}>

            <Grid item container direction="row" justify="center" alignItems="center" xs={12}>

                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                   <br/> Gracias por su compra
                </Grid>

                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                   <br/>Estamos finalizando su pedido
                </Grid>

                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                   <br/>Acuerdese de comunicarse por whatsapp al (+54)11 6206-7821
                </Grid>

                <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                   <br/>Sera redireccionado al portal de pago...
                </Grid>

                <Grid item xs={12}>

                    <br/>
                    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />

                </Grid>

            </Grid>

        </Box >
    );
}