import React from 'react';
import clsx from 'clsx';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { 
  Drawer ,AppBar, Toolbar, CssBaseline, Typography, Divider, IconButton
} from '@material-ui/core';

import Sizes from './Size';
import Catalogo from './Catalogo';
import Sign from "./Sign";
import Fotter from "../component/Fotter";
import ModalBotton from "./ModalBotton";
import ShoppingCart from "./ShoppingCart"

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InputIcon from '@material-ui/icons/Input';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';


const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
}));
  

function AppBars(props) {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {

    if( localStorage.getItem('token') ){

      props.SingIn(true);

      props.SignUp(false);  
    }
    if(!localStorage.getItem('token') && localStorage.getItem('cartNoRegister') ){
    
      JSON.parse(localStorage.getItem('cartNoRegister')).map(json => props.CartNoRegister(json))
    }

  },[])


  return (

    <div className={classes.root}>

      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >

            <MenuIcon />

          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap >

            Running Deportes

          </Typography>

          <ModalBotton props={<ShoppingCart/>} icon={<ShoppingCartOutlinedIcon/>} style={{height: "95vh", width: "90vw" }} color={"inherit"}/>

          <ModalBotton props={<Sign/>} icon={props.singin === true ? <PersonIcon/> : <InputIcon/> } style={{height: "95vh", width: "90vw" }} color={"inherit"}/>

        </Toolbar>

      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className={classes.toolbar}>

          <IconButton onClick={handleDrawerClose}>

            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}

          </IconButton>

        </div>

        <Divider/>

        <Sizes/>

      </Drawer>

      <main className={classes.content}>
        
        <div className={classes.toolbar} />

         <Catalogo/> 

        <Fotter/>
      </main>

    </div>  
  );
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    singin: state.singin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBars);
