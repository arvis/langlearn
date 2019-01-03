import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,HashRouter,Route} from 'react-router-dom';
import Suggestions from './Suggestions';
import Favorites from './Favorites';
import Header from './Header';
import ItemDetails from './ItemDetails';
import AddSuggestion from './AddSuggestion';

const App = () => (
  <HashRouter>
    <div>
      <Header/>
      <Route path="/" exact component={Suggestions} />
      <Route path="/favorites/" exact component={Favorites} />
      {/* <Route path="/items/:id" component={ItemDetails} key={props.match.params.pageid} /> */}
      <Route path="/items/:pageId" render={(props) => (
        <ItemDetails key={props.match.params.pageId} {...props} />)
          } />
      <Route path="/suggest/" exact component={AddSuggestion} />

    </div>
  </HashRouter >


);

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;

export default App;