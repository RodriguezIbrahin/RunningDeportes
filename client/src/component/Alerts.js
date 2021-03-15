import React from 'react';
import { IconButton, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';



export function AlertError(props) {

    return (

        <Collapse in={props.props}>
            
            <Alert variant="filled" severity="error"
                
                action={
                  
                    <IconButton

                       aria-label="close"
                       color="inherit"
                       size="small"
                       onClick={() => {props.onClick(false)}}
                    >
                        
                        <CloseIcon fontSize="inherit" />
                    
                    </IconButton>
                }
            >
                
                Ups! Parece algo malio sal... 

             </Alert>

        </Collapse> 

    );

}

export function AlertSucess(props) {

    return (
    
        <Collapse in={props.props}>
            
            <Alert variant="filled" severity="success" color="info"
  
                action={
  
                    <IconButton
  
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {props.onClick(false)}}
                    >
                        
                        <CloseIcon fontSize="inherit" />
  
                    </IconButton>
                }
            >
                Genial! Tiene buena pinta! 
  
            </Alert>
  
        </Collapse>
           
    );
}

