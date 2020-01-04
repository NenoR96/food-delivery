import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import Home from './components/home/home';
//import Admin from './components/admin/admin';
import Error from './components/Error';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import foodMenu from './components/foodMenu/foodMenu';
import foodItem from './components/foodItem/foodItem';
import Admin from './components/admin/admin';

class App extends Component {

  render(){
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/test" component={Admin} />

          <Route
              path="/admin"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/food-menu/add`} component={foodMenu} />
                  <Route path={`${url}/food-item/add`} component={foodItem} />
                </>
              )}
            />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
