import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';

import DeleteSizeProduct from "./DeleteSizeProduct";
import CreateSizeProduct from "./CreateSizeProduct";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import CreateSize from "./CreateSize";
import DeleteSize from "./DeleteSize";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "80vw",
  },
}));

export default function CrudPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="full width tabs example"
        >
          <Tab label="Crear Talle" {...a11yProps(0)} />
          <Tab label="Crear Producto" {...a11yProps(1)} />
          <Tab label="Actualizar Producto" {...a11yProps(2)} />
          <Tab label="Borrar Producto" {...a11yProps(3)} />
          <Tab label="Borrar Talle de Producto" {...a11yProps(4)} />
          <Tab label="Agregar Talle a un Producto" {...a11yProps(5)} />
          <Tab label="Borrar un Talle" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CreateSize/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CreateProduct/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <UpdateProduct/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <DeleteProduct/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <DeleteSizeProduct/>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <CreateSizeProduct/>
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <DeleteSize/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
