import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route} from 'react-router-dom';
import Suggestions from './Suggestions';
import Favorites from './Favorites';
import Header from './Header';
import ItemDetails from './ItemDetails';

const App = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Route path="/" exact component={Suggestions} />
      <Route path="/favorites/" exact component={Favorites} />
      <Route path="/items/:id" component={ItemDetails} />
    </div>
  </BrowserRouter>


);

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;

export default App;