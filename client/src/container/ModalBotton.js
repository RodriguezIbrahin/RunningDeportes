import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Backdrop, Fade, Grid, IconButton } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll"
  },
}));

export default function ModalBotton({icon, props, color, style, variant, disabled}) {

    const classes = useStyles();
  
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        
        <div>
            <Button fullWidth color={color} onClick={handleOpen} variant={variant} disabled={disabled}>
                {icon}
            </Button>

            <Modal className={classes.modal} 
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >

                <Fade in={open}>

                    <Grid className={classes.paper} style={style}>

                        <Grid container direction="row" justify="flex-end" alignItems="center" xs={12}>

                            <IconButton onClick={handleClose} style={{height: "1vh"}}>
                                <CancelOutlinedIcon/>
                            </IconButton>

                        </Grid>

                        <Grid xs={12}>

                          {props} 

                        </Grid>
                        
                    </Grid>

                </Fade>

            </Modal>

        </div>

    );

}