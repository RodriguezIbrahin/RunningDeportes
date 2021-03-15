import React from 'react';
import AppBars from "./component/AppBar";
import { BrowserRouter, Route } from 'react-router-dom';
import CrudPanel from "./crud/CrudPanel";

function App() {
  return (
    <BrowserRouter>
       <Route exact path="/" component={AppBars}/>
       <Route exact path="/crud" component={CrudPanel}/>
    </BrowserRouter>
  );
}

export default App;
