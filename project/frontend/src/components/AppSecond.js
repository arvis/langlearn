import React from "react";
import ReactDOM from "react-dom";

const AppSecond = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Route path="/" exact component={Suggestions} />
      <Route path="/favorites/" exact component={Favorites} />
    </div>
  </BrowserRouter>


);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppSecond />, wrapper) : null;